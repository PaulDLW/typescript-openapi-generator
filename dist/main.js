#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var typescript_code_gen_1 = require("./typescript-code-gen");
var path = require("path");
var argv = yargs
    .option('apiFile', {
    type: 'string',
    demand: true
})
    .option('outputDir', {
    type: 'string',
    default: 'code-gen-output'
})
    .option('generator', {
    type: 'string',
    default: 'default'
}).argv;
var dirName = path.normalize(path.join(__dirname, '..'));
typescript_code_gen_1.typescriptCodeGen(argv.apiFile, argv.outputDir, argv.generator, dirName);
//# sourceMappingURL=main.js.map