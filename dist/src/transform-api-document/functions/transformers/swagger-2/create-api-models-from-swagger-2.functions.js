"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../../../common/functions");
function createApiModelsFromSwagger2(apiObject) {
    var swaggerModels = apiObject.definitions;
    return Object.keys(swaggerModels).map(function (modelName) {
        var model = swaggerModels[modelName];
        var fileName = functions_1.toKebabCase(modelName) + ".model";
        return {
            className: modelName,
            fileName: fileName + ".ts",
            fileNameNoExt: fileName,
            modelReferences: findModelReferences(model),
            extends: [],
            properties: createModelProperties(model),
            type: model.type
        };
    });
}
exports.createApiModelsFromSwagger2 = createApiModelsFromSwagger2;
function findModelReferences(model) {
    if (!model.properties) {
        return [];
    }
    return Object.keys(model.properties).reduce(function (imports, key) {
        var property = model.properties[key];
        if (!!property.$ref) {
            imports.push(functions_1.getModelNameFromFullReference(property.$ref));
        }
        else if (!!property.items) {
            if (!!property.items.$ref) {
                imports.push(functions_1.getModelNameFromFullReference(property.items.$ref));
            }
        }
        // remove duplicates
        return __spread(new Set(imports));
    }, []);
}
function createModelProperties(model) {
    if (!model.properties) {
        return [];
    }
    return Object.keys(model.properties).reduce(function (properties, propertyName) {
        var property = model.properties[propertyName];
        if (!!property.$ref) {
            properties.push({
                name: propertyName,
                type: functions_1.getModelNameFromFullReference(property.$ref),
                required: isRequired(model, propertyName)
            });
        }
        else if (!!property.items) {
            if (!!property.items.$ref) {
                properties.push({
                    name: propertyName,
                    type: functions_1.getModelNameFromFullReference(property.items.$ref) + "[]",
                    required: isRequired(model, propertyName)
                });
            }
            else {
                properties.push({
                    name: propertyName,
                    type: property.items.type + "[]",
                    required: isRequired(model, propertyName)
                });
            }
        }
        else if (!!property.type) {
            properties.push({
                name: propertyName,
                type: property.type,
                required: isRequired(model, propertyName)
            });
        }
        return properties;
    }, []);
}
function isRequired(model, name) {
    if (!model.required) {
        return false;
    }
    return model.required.some(function (required) { return required === name; });
}
//# sourceMappingURL=create-api-models-from-swagger-2.functions.js.map