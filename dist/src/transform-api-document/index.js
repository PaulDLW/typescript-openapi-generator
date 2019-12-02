"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_api_definition_from_swagger_2_function_1 = require("./functions/swagger-2/create-api-definition-from-swagger-2.function");
function transformApiDocument(apiRawObject) {
    var apiDefinition;
    if (isOpenApi3(apiRawObject)) {
        apiDefinition = create_api_definition_from_swagger_2_function_1.createApiDefinitionFromSwagger2(apiRawObject);
    }
    else {
        apiDefinition = create_api_definition_from_swagger_2_function_1.createApiDefinitionFromSwagger2(apiRawObject);
    }
    return apiDefinition;
}
exports.transformApiDocument = transformApiDocument;
function isOpenApi3(apiRawObject) {
    return !!apiRawObject.openapi;
}
//# sourceMappingURL=index.js.map