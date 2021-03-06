import { safeLoad } from 'js-yaml';
import * as fs from 'fs';
import { join, dirname } from 'path';
import { transformApiDocument } from './src/transform-api-document';
import { generateCode } from './src/generate-code';

export function typescriptCodeGen(
  apiFile: string,
  outputDir: string,
  generator: string,
  dirName: string
) {
  const cwd = process.cwd();
  const apiFileLocation = join(cwd, apiFile);

  if (!fs.existsSync(apiFileLocation)) {
    console.error('Cannot load the provided api file');
    return;
  }

  const extension = apiFileLocation.split('.').pop();

  let apiRawObject = null;

  switch (extension) {
    case 'json':
      apiRawObject = JSON.parse(fs.readFileSync(apiFileLocation, 'utf8'));
      break;
    case 'yaml':
      apiRawObject = safeLoad(fs.readFileSync(apiFileLocation, 'utf8'));
      break;
    case 'yml':
      apiRawObject = safeLoad(fs.readFileSync(apiFileLocation, 'utf8'));
      break;
    default:
      console.error('File provided is not a json or a yaml/yml file');
      return;
  }

  const apiDefinition = transformApiDocument(apiRawObject);
  const codeGennedFiles = generateCode(apiDefinition, generator, dirName);

  const outputPath = join(cwd, outputDir);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  codeGennedFiles.forEach(codeGennedFile => {
    const directory = dirname(codeGennedFile.name);
    const subDir = join(outputPath, directory);

    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    fs.writeFileSync(
      join(outputPath, codeGennedFile.name),
      codeGennedFile.content
    );
  });
}
