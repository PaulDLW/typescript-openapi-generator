"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toKebabCase(input) {
    return input
        .split(/(?=[A-Z])/)
        .join('-')
        .toLocaleLowerCase()
        .replace(/\W+/g, '-');
}
exports.toKebabCase = toKebabCase;
function toPascalCase(input) {
    return input
        .split(/\W+/g)
        .map(function (split) { return toTitleCase(split); })
        .join('');
}
exports.toPascalCase = toPascalCase;
function toCamelCase(input) {
    var pascalInput = toPascalCase(input);
    return pascalInput.charAt(0).toLocaleLowerCase() + pascalInput.substr(1);
}
exports.toCamelCase = toCamelCase;
function toTitleCase(input) {
    return input.charAt(0).toLocaleUpperCase() + input.substr(1);
}
exports.toTitleCase = toTitleCase;
//# sourceMappingURL=string-manipulation.functions.js.map