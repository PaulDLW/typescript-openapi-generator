import {
  Swagger2,
  ServiceModel,
  HttpPaths,
  PathModel,
  Parameter,
  ApiParameter,
  ServiceImport,
  Responses
} from '../../../common/models';
import {
  toKebabCase,
  toPascalCase,
  getModelNameFromFullReference,
  toCamelCase,
  mapType
} from '../../../common/functions';

interface GroupedPaths {
  [key: string]: PathModel[];
}

export function createPathsFromSwagger2(apiObject: Swagger2): ServiceModel[] {
  const groupedPaths = groupPaths(apiObject.paths);

  return Object.keys(groupedPaths).map(
    (pathName): ServiceModel => {
      const fileName = `${toKebabCase(pathName)}.data-service`;

      return {
        className: `${toPascalCase(pathName)}DataService`,
        fileName: `services/${fileName}.ts`,
        fileNameNoExt: fileName,
        paths: groupedPaths[pathName],
        imports: getImports(groupedPaths[pathName])
      };
    }
  );
}

function getImports(paths: PathModel[]) {
  const imports: ServiceImport[] = [];

  paths.forEach(path => {
    path.parameters.forEach(parameter => {
      const parameterType = removeBrackets(parameter.type);

      if (shouldIncludeTypeInImports(parameterType)) {
        imports.push({
          name: parameterType,
          path: '../models'
        });
      }
    });

    const responseType = removeBrackets(path.responseType);

    if (shouldIncludeTypeInImports(responseType)) {
      imports.push({ name: responseType, path: '../models' });
    }
  });

  return imports.filter(
    (thing, index, self) => self.findIndex(t => t.name === thing.name) === index
  );
}

function removeBrackets(typeImport: string) {
  return typeImport.replace(/\[/g, '').replace(/\]/g, '');
}

function shouldIncludeTypeInImports(type: string) {
  return (
    type !== 'string' &&
    type !== 'number' &&
    type !== 'boolean' &&
    type !== 'array' &&
    type !== 'object' &&
    type !== 'file' &&
    type !== 'any' &&
    type !== 'Blob' &&
    !type.includes('key:')
  );
}

function groupPaths(paths: HttpPaths) {
  if (!paths) {
    return {};
  }

  return Object.keys(paths).reduce((groupedPaths, path) => {
    const swaggerPath = paths[path];

    Object.keys(swaggerPath).map(httpVerb => {
      const tag =
        swaggerPath[httpVerb].tags && swaggerPath[httpVerb].tags.length > 0
          ? swaggerPath[httpVerb].tags[0]
          : 'Default';

      if (!groupedPaths[tag]) {
        groupedPaths[tag] = [];
      }

      const mappedParameters = mapParameters(swaggerPath[httpVerb].parameters);

      groupedPaths[tag].push({
        methodName: `${httpVerb}${toPascalCase(path)}`,
        endpoint: path
          .replace(/{/g, '${encodeURIComponent(String(')
          .replace(/}/g, '))}'),
        httpVerb,
        parameters: mappedParameters,
        bodyObject: getBodyObject(mappedParameters),
        responseType: getResponseType(swaggerPath[httpVerb].responses)
      });
    });

    return groupedPaths;
  }, {} as GroupedPaths);
}

function getBodyObject(parameters: ApiParameter[]) {
  const bodyParameter = parameters.find(parameter => {
    return parameter.in === 'body';
  });

  return bodyParameter === undefined ? undefined : bodyParameter.name;
}

function getResponseType(responses: Responses) {
  if (!responses) {
    return 'any';
  }

  return Object.keys(responses).reduce((responseType, key) => {
    // check if it is a 2xx code
    if (key.charAt(0) === '2') {
      const response = responses[key];

      const mappedType = response.type;

      if (!!mappedType) {
        responseType = mappedType;
      } else if (!!response.schema) {
        if (!!response.schema.items) {
          responseType = `${getModelNameFromFullReference(
            response.schema.items.$ref
          )}[]`;
        } else {
          if (!!response.schema.type) {
            responseType = response.schema.type;

            if (
              response.schema.type === 'object' &&
              !!response.schema.additionalProperties
            ) {
              responseType = `{ [key: string]: ${mapType(
                response.schema.additionalProperties.type
              )}; }`;
            }
          } else {
            responseType = getModelNameFromFullReference(response.schema.$ref);
          }
        }
      }
    }

    return mapType(responseType);
  }, 'any');
}

function mapParameters(parameters: Parameter[]): ApiParameter[] {
  if (!parameters) {
    return [];
  }

  return parameters.map(parameter => {
    let paramType = parameter.type;

    if (!!paramType) {
      if (!!parameter.items) {
        paramType = `${mapType(parameter.items.type)}[]`;
      } else if (paramType === 'file') {
        paramType = 'Blob';
      }
    } else if (!!parameter.schema) {
      if (!!parameter.schema.items) {
        paramType = `${getModelNameFromFullReference(
          parameter.schema.items.$ref
        )}[]`;
      } else {
        paramType = getModelNameFromFullReference(parameter.schema.$ref);
      }
    }

    return {
      ...parameter,
      name: toCamelCase(parameter.name),
      type: mapType(paramType)
    };
  });
}
