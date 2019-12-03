"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var Handlebars = require("handlebars");
var HandlebarsHelpers = require("handlebars-helpers");
var multihelpers = HandlebarsHelpers();
Object.keys(multihelpers).forEach(function (key) {
    Handlebars.registerHelper(key, multihelpers[key]);
});
function generateCode(apiDefinition, generator, dirName) {
    var templateRoot = path_1.join(dirName, 'templates', generator);
    var serviceFiles = createServicesFiles(apiDefinition.paths, templateRoot);
    var modelFiles = createModelFiles(apiDefinition.models, templateRoot);
    var additionalFiles = createAdditionalFiles(apiDefinition, templateRoot);
    return __spread(serviceFiles, modelFiles, additionalFiles);
}
exports.generateCode = generateCode;
function createServicesFiles(pathModels, templateRoot) {
    var servicesRoot = path_1.join(templateRoot, 'services');
    if (!fs_1.existsSync(servicesRoot)) {
        return [];
    }
    var source = fs_1.readFileSync(path_1.join(servicesRoot, 'service.handlebars'), 'utf8');
    var template = Handlebars.compile(source);
    return pathModels.map(function (pathModel) {
        var content = template(pathModel);
        return { name: pathModel.fileName, content: content };
    });
}
function createModelFiles(apiModels, templateRoot) {
    var modelsRoot = path_1.join(templateRoot, 'models');
    if (!fs_1.existsSync(modelsRoot)) {
        return [];
    }
    var source = fs_1.readFileSync(path_1.join(modelsRoot, 'model.handlebars'), 'utf8');
    var template = Handlebars.compile(source);
    return apiModels.map(function (apiModel) {
        var content = template(apiModel);
        return { name: "models/" + apiModel.fileName, content: content };
    });
}
function createAdditionalFiles(apiDefinition, templateRoot) {
    var additionalTemplates = findAllFiles(templateRoot);
    return additionalTemplates.map(function (additionalTemplate) {
        var subPath = additionalTemplate
            .replace(templateRoot, '')
            .replace(path_1.sep, '')
            .replace('handlebars', 'ts');
        var source = fs_1.readFileSync(additionalTemplate, 'utf8');
        var template = Handlebars.compile(source);
        var content = template(apiDefinition);
        return { name: subPath, content: content };
    });
}
var findAllFiles = function (dir) {
    var results = [];
    var list = fs_1.readdirSync(dir);
    list.forEach(function (file) {
        file = path_1.join(dir, file);
        var stat = fs_1.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(findAllFiles(file));
        }
        else {
            results.push(file);
        }
    });
    return results.filter(function (result) {
        return !result.includes('model.handlebars') &&
            !result.includes('service.handlebars');
    });
};
//# sourceMappingURL=generate-code.js.map