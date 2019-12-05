"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transformer_factory_1 = require("./functions/transformers/transformer.factory");
function transformApiDocument(apiRawObject) {
    return transformer_factory_1.transformerFactory(apiRawObject).transform();
}
exports.transformApiDocument = transformApiDocument;
//# sourceMappingURL=index.js.map