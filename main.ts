#!/usr/bin/env node
import * as yargs from 'yargs';
import { typescriptCodeGen } from './typescript-code-gen';
import * as path from 'path';

const argv = yargs
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

const dirName = path.normalize(path.join(__dirname, '..'));

typescriptCodeGen(argv.apiFile, argv.outputDir, argv.generator, dirName);
