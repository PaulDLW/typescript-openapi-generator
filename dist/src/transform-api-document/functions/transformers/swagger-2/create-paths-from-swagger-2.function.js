"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../../../common/functions");
function createPathsFromSwagger2(apiObject) {
    var groupedPaths = groupPaths(apiObject.paths);
    return Object.keys(groupedPaths).map(function (pathName) {
        var fileName = functions_1.toKebabCase(pathName) + ".data-service";
        return {
            className: functions_1.toPascalCase(pathName) + "DataService",
            fileName: "services/" + fileName + ".ts",
            fileNameNoExt: fileName,
            paths: groupedPaths[pathName],
            imports: getImports(groupedPaths[pathName])
        };
    });
}
exports.createPathsFromSwagger2 = createPathsFromSwagger2;
function getImports(paths) {
    var imports = [];
    paths.forEach(function (path) {
        path.parameters.forEach(function (parameter) {
            if (parameter.type !== 'string' &&
                parameter.type !== 'number' &&
                parameter.type !== 'boolean' &&
                parameter.type !== 'array' &&
                parameter.type !== 'object' &&
                parameter.type !== 'any') {
                imports.push({ name: parameter.type, path: '../models' });
            }
        });
        // remove array brackets if they exist
        var responseType = path.responseType
            .replace(/\[/g, '')
            .replace(/\]/g, '');
        if (responseType !== 'string' &&
            responseType !== 'number' &&
            responseType !== 'boolean' &&
            responseType !== 'array' &&
            responseType !== 'object' &&
            responseType !== 'any') {
            imports.push({ name: responseType, path: '../models' });
        }
    });
    return imports.filter(function (thing, index, self) { return self.findIndex(function (t) { return t.name === thing.name; }) === index; });
}
function groupPaths(paths) {
    if (!paths) {
        return {};
    }
    return Object.keys(paths).reduce(function (groupedPaths, path) {
        var swaggerPath = paths[path];
        Object.keys(swaggerPath).map(function (httpVerb) {
            var tag = swaggerPath[httpVerb].tags && swaggerPath[httpVerb].tags.length > 0
                ? swaggerPath[httpVerb].tags[0]
                : 'Default';
            if (!groupedPaths[tag]) {
                groupedPaths[tag] = [];
            }
            var mappedParameters = mapParameters(swaggerPath[httpVerb].parameters);
            groupedPaths[tag].push({
                methodName: "" + httpVerb + functions_1.toPascalCase(path),
                endpoint: path
                    .replace(/{/g, '${encodeURIComponent(String(')
                    .replace(/}/g, '))}'),
                httpVerb: httpVerb,
                parameters: mappedParameters,
                bodyObject: getBodyObject(mappedParameters),
                responseType: getResponseType(swaggerPath[httpVerb].responses)
            });
        });
        return groupedPaths;
    }, {});
}
function getBodyObject(parameters) {
    var bodyParameter = parameters.find(function (parameter) {
        return parameter.in === 'body';
    });
    return bodyParameter === undefined ? undefined : bodyParameter.name;
}
function getResponseType(responses) {
    if (!responses) {
        return 'any';
    }
    return Object.keys(responses).reduce(function (responseType, key) {
        // check if it is a 2xx code
        if (key.charAt(0) === '2') {
            var response = responses[key];
            if (!!response.type) {
                responseType = response.type;
            }
            else if (!!response.schema) {
                if (!!response.schema.items) {
                    responseType = functions_1.getModelNameFromFullReference(response.schema.items.$ref) + "[]";
                }
                else {
                    responseType = functions_1.getModelNameFromFullReference(response.schema.$ref);
                }
            }
        }
        return responseType;
    }, 'any');
}
function mapParameters(parameters) {
    if (!parameters) {
        return [];
    }
    return parameters.map(function (parameter) {
        var paramType = parameter.type;
        if (!paramType && !!parameter.schema) {
            paramType = functions_1.getModelNameFromFullReference(parameter.schema.$ref);
        }
        return __assign(__assign({}, parameter), { name: functions_1.toCamelCase(parameter.name), type: paramType });
    });
}
//# sourceMappingURL=create-paths-from-swagger-2.function.js.map