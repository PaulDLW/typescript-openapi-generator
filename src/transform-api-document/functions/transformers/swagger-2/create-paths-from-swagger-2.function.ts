import {
  Swagger2,
  ServiceModel,
  HttpPaths,
  PathModel,
  Parameter,
  ApiParameter,
  ServiceImport,
  Responses
} from '../../../../common/models';
import {
  toKebabCase,
  toPascalCase,
  getModelNameFromFullReference,
  toCamelCase
} from '../../../../common/functions';

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
      if (
        parameter.type !== 'string' &&
        parameter.type !== 'number' &&
        parameter.type !== 'boolean' &&
        parameter.type !== 'array' &&
        parameter.type !== 'object' &&
        parameter.type !== 'any'
      ) {
        imports.push({ name: parameter.type, path: '../models' });
      }
    });

    // remove array brackets if they exist
    const responseType = path.responseType
      .replace(/\[/g, '')
      .replace(/\]/g, '');

    if (
      responseType !== 'string' &&
      responseType !== 'number' &&
      responseType !== 'boolean' &&
      responseType !== 'array' &&
      responseType !== 'object' &&
      responseType !== 'any'
    ) {
      imports.push({ name: responseType, path: '../models' });
    }
  });

  return imports.filter(
    (thing, index, self) => self.findIndex(t => t.name === thing.name) === index
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

      if (!!response.type) {
        responseType = response.type;
      } else if (!!response.schema) {
        if (!!response.schema.items) {
          responseType = `${getModelNameFromFullReference(
            response.schema.items.$ref
          )}[]`;
        } else {
          responseType = getModelNameFromFullReference(response.schema.$ref);
        }
      }
    }

    return responseType;
  }, 'any');
}

function mapParameters(parameters: Parameter[]): ApiParameter[] {
  if (!parameters) {
    return [];
  }

  return parameters.map(parameter => {
    let paramType = parameter.type;

    if (!paramType && !!parameter.schema) {
      paramType = getModelNameFromFullReference(parameter.schema.$ref);
    }

    return {
      ...parameter,
      name: toCamelCase(parameter.name),
      type: paramType
    };
  });
}
