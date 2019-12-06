"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = require("js-yaml");
var fs = require("fs");
var path_1 = require("path");
var transform_api_document_1 = require("./src/transform-api-document");
var generate_code_1 = require("./src/generate-code");
function typescriptCodeGen(apiFile, outputDir, generator, dirName) {
    var cwd = process.cwd();
    var apiFileLocation = path_1.join(cwd, apiFile);
    if (!fs.existsSync(apiFileLocation)) {
        console.error('Cannot load the provided api file');
        return;
    }
    var extension = apiFileLocation.split('.').pop();
    var apiRawObject = null;
    switch (extension) {
        case 'json':
            apiRawObject = JSON.parse(fs.readFileSync(apiFileLocation, 'utf8'));
            break;
        case 'yaml':
            apiRawObject = js_yaml_1.safeLoad(fs.readFileSync(apiFileLocation, 'utf8'));
            break;
        case 'yml':
            apiRawObject = js_yaml_1.safeLoad(fs.readFileSync(apiFileLocation, 'utf8'));
            break;
        default:
            console.error('File provided is not a json or a yaml/yml file');
            return;
    }
    var apiDefinition = transform_api_document_1.transformApiDocument(apiRawObject);
    var codeGennedFiles = generate_code_1.generateCode(apiDefinition, generator, dirName);
    var outputPath = path_1.join(cwd, outputDir);
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    codeGennedFiles.forEach(function (codeGennedFile) {
        var directory = path_1.dirname(codeGennedFile.name);
        var subDir = path_1.join(outputPath, directory);
        if (!fs.existsSync(subDir)) {
            fs.mkdirSync(subDir, { recursive: true });
        }
        fs.writeFileSync(path_1.join(outputPath, codeGennedFile.name), codeGennedFile.content);
    });
}
exports.typescriptCodeGen = typescriptCodeGen;
//# sourceMappingURL=typescript-code-gen.js.map