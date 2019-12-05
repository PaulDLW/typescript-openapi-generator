import {
  ApiDefinition,
  ApiModel,
  ServiceModel
} from './common/models/api-definition.model';
import { join, sep } from 'path';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import * as Handlebars from 'handlebars';
import * as HandlebarsHelpers from 'handlebars-helpers';

const multihelpers = HandlebarsHelpers();

Object.keys(multihelpers).forEach(key => {
  Handlebars.registerHelper(key, multihelpers[key]);
});

export function generateCode(
  apiDefinition: ApiDefinition,
  generator: string,
  dirName: string
) {
  const templateRoot = join(dirName, 'templates', generator);

  const serviceFiles = createServicesFiles(apiDefinition.paths, templateRoot);
  const modelFiles = createModelFiles(apiDefinition.models, templateRoot);
  const additionalFiles = createAdditionalFiles(apiDefinition, templateRoot);

  return [...serviceFiles, ...modelFiles, ...additionalFiles];
}

function createServicesFiles(pathModels: ServiceModel[], templateRoot: string) {
  const servicesRoot = join(templateRoot, 'services');

  if (!existsSync(servicesRoot)) {
    return [];
  }

  const source = readFileSync(join(servicesRoot, 'service.handlebars'), 'utf8');

  const template = Handlebars.compile(source);

  return pathModels.map(pathModel => {
    const content = template(pathModel);

    return { name: pathModel.fileName, content };
  });
}

function createModelFiles(apiModels: ApiModel[], templateRoot: string) {
  const modelsRoot = join(templateRoot, 'models');

  if (!existsSync(modelsRoot)) {
    return [];
  }

  const source = readFileSync(join(modelsRoot, 'model.handlebars'), 'utf8');

  const template = Handlebars.compile(source);

  return apiModels.map(apiModel => {
    const content = template(apiModel);

    return { name: `models/${apiModel.fileName}`, content };
  });
}

function createAdditionalFiles(
  apiDefinition: ApiDefinition,
  templateRoot: string
) {
  const additionalTemplates = findAllFiles(templateRoot);

  return additionalTemplates.map(additionalTemplate => {
    const subPath = additionalTemplate
      .replace(templateRoot, '')
      .replace(sep, '')
      .replace('handlebars', 'ts');

    const source = readFileSync(additionalTemplate, 'utf8');
    const template = Handlebars.compile(source);

    var content = template(apiDefinition);

    return { name: subPath, content };
  });
}

var findAllFiles = function(dir: string) {
  let results: string[] = [];

  const list = readdirSync(dir);

  list.forEach(function(file) {
    file = join(dir, file);

    const stat = statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(findAllFiles(file));
    } else {
      results.push(file);
    }
  });
  return results.filter(
    result =>
      !result.includes('model.handlebars') &&
      !result.includes('service.handlebars')
  );
};
