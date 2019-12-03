"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openapi_3_transformer_1 = require("./openApi-3/openapi-3.transformer");
var swagger2_transformer_1 = require("./swagger-2/swagger2.transformer");
function transformerFactory(apiRawObject) {
    if (isOpenApi3(apiRawObject)) {
        return openapi_3_transformer_1.openApiTransformer(apiRawObject);
    }
    else {
        return swagger2_transformer_1.swagger2Transformer(apiRawObject);
    }
}
exports.transformerFactory = transformerFactory;
function isOpenApi3(apiRawObject) {
    return !!apiRawObject.openapi;
}
//# sourceMappingURL=transformer.factory.js.map