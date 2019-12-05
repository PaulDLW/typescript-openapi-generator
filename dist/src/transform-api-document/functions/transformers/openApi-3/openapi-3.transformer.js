"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function openApiTransformer(apiObject) {
    return {
        transform: function () {
            return {
                models: [],
                paths: []
            };
        }
    };
}
exports.openApiTransformer = openApiTransformer;
//# sourceMappingURL=openapi-3.transformer.js.map