"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_api_models_from_swagger_2_functions_1 = require("./create-api-models-from-swagger-2.functions");
var create_paths_from_swagger_2_function_1 = require("./create-paths-from-swagger-2.function");
function createApiDefinitionFromSwagger2(apiObject) {
    var models = create_api_models_from_swagger_2_functions_1.createApiModelsFromSwagger2(apiObject);
    var paths = create_paths_from_swagger_2_function_1.createPathsFromSwagger2(apiObject);
    return {
        models: models,
        paths: paths
    };
}
exports.createApiDefinitionFromSwagger2 = createApiDefinitionFromSwagger2;
//# sourceMappingURL=create-api-definition-from-swagger-2.function.js.map