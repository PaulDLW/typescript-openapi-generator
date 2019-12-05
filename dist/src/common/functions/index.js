"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./string-manipulation.functions"));
function getModelNameFromFullReference(reference) {
    var refSplit = reference.split(/\//g);
    return refSplit[refSplit.length - 1];
}
exports.getModelNameFromFullReference = getModelNameFromFullReference;
//# sourceMappingURL=index.js.map