import {
  Swagger2,
  ApiModel,
  Definition,
  ApiModelProperties
} from '../../../common/models';

import {
  toKebabCase,
  getModelNameFromFullReference
} from '../../../common/functions';

export function createApiModelsFromSwagger2(apiObject: Swagger2) {
  const swaggerModels = apiObject.definitions;

  return Object.keys(swaggerModels).map(
    (modelName): ApiModel => {
      const model = swaggerModels[modelName];

      const fileName = `${toKebabCase(modelName)}.model`;

      return {
        className: modelName,
        fileName: `${fileName}.ts`,
        fileNameNoExt: fileName,
        modelReferences: findModelReferences(model),
        extends: findModelInheritance(model),
        properties: createModelProperties(model),
        type: model.type
      };
    }
  );
}

function findModelReferences(model: Definition) {
  if (!model.properties) {
    return [];
  }

  return Object.keys(model.properties).reduce((imports, key) => {
    const property = model.properties[key];

    if (!!property.$ref) {
      imports.push(getModelNameFromFullReference(property.$ref));
    } else if (!!property.items) {
      if (!!property.items.$ref) {
        imports.push(getModelNameFromFullReference(property.items.$ref));
      }
    }
    // remove duplicates
    return [...new Set(imports)];
  }, [] as string[]);
}

function findModelInheritance(model: Definition) {
  if (!model.allOf) {
    return [];
  }

  return model.allOf.reduce((inherits, allOf) => {
    if (!!allOf.$ref) {
      inherits.push(getModelNameFromFullReference(allOf.$ref));
    }
    return inherits;
  }, [] as string[]);
}

function createModelProperties(model: Definition) {
  if (!model.properties) {
    return [];
  }

  return Object.keys(model.properties).reduce(
    (properties, propertyName): ApiModelProperties[] => {
      const property = model.properties[propertyName];

      if (!!property.$ref) {
        properties.push({
          name: propertyName,
          type: getModelNameFromFullReference(property.$ref),
          required: isRequired(model, propertyName)
        });
      } else if (!!property.items) {
        if (!!property.items.$ref) {
          properties.push({
            name: propertyName,
            type: `${getModelNameFromFullReference(property.items.$ref)}[]`,
            required: isRequired(model, propertyName)
          });
        } else {
          properties.push({
            name: propertyName,
            type: `${property.items.type}[]`,
            required: isRequired(model, propertyName)
          });
        }
      } else if (!!property.type) {
        properties.push({
          name: propertyName,
          type: property.type,
          required: isRequired(model, propertyName)
        });
      }
      return properties;
    },
    [] as ApiModelProperties[]
  );
}

function isRequired(model: Definition, name: string) {
  if (!model.required) {
    return false;
  }

  return model.required.some(required => required === name);
}
