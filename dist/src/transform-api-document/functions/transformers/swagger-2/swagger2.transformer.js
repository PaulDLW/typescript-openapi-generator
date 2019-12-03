"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_api_models_from_swagger_2_functions_1 = require("./create-api-models-from-swagger-2.functions");
var create_paths_from_swagger_2_function_1 = require("./create-paths-from-swagger-2.function");
function swagger2Transformer(apiObject) {
    return {
        transform: function () {
            var models = create_api_models_from_swagger_2_functions_1.createApiModelsFromSwagger2(apiObject);
            var paths = create_paths_from_swagger_2_function_1.createPathsFromSwagger2(apiObject);
            return {
                models: models,
                paths: paths
            };
        }
    };
}
exports.swagger2Transformer = swagger2Transformer;
//# sourceMappingURL=swagger2.transformer.js.map