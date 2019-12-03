"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicOutput = {
    models: [
        {
            className: 'TestReference',
            extends: [],
            fileName: 'test-reference.model.ts',
            fileNameNoExt: 'test-reference.model',
            modelReferences: [],
            properties: [],
            type: 'string'
        },
        {
            className: 'TestObject',
            extends: [],
            fileName: 'test-object.model.ts',
            fileNameNoExt: 'test-object.model',
            modelReferences: ['TestReference'],
            properties: [
                {
                    name: 'testNumber',
                    required: true,
                    type: 'number'
                },
                {
                    name: 'testBoolean',
                    required: true,
                    type: 'boolean'
                },
                {
                    name: 'testString',
                    required: false,
                    type: 'string'
                },
                {
                    name: 'testReferance',
                    required: false,
                    type: 'TestReference'
                }
            ],
            type: 'object'
        }
    ],
    paths: [
        {
            className: 'DefaultDataService',
            fileName: 'services/default.data-service.ts',
            fileNameNoExt: 'default.data-service',
            imports: [],
            paths: [
                {
                    bodyObject: undefined,
                    endpoint: '/health-check',
                    httpVerb: 'get',
                    methodName: 'getHealthCheck',
                    parameters: [],
                    responseType: 'any'
                }
            ]
        }
    ]
};
//# sourceMappingURL=basic-output.test-data.js.map