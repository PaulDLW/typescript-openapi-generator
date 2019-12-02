"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polymorphismInput = {
    swagger: '2.0',
    info: {
        description: '',
        version: '1.0.0',
        title: ''
    },
    basePath: '/',
    tags: [],
    schemes: ['http'],
    paths: {},
    definitions: {
        Pet: {
            type: 'object',
            discriminator: 'petType',
            properties: {
                name: {
                    type: 'string'
                },
                petType: {
                    type: 'string'
                }
            },
            required: ['name', 'petType']
        },
        Cat: {
            description: 'A representation of a cat',
            allOf: [
                {
                    $ref: '#/definitions/Pet'
                },
                {
                    type: 'object',
                    properties: {
                        huntingSkill: {
                            type: 'string',
                            description: 'The measured skill for hunting',
                            default: 'lazy',
                            enum: ['clueless', 'lazy', 'adventurous', 'aggressive']
                        }
                    },
                    required: ['huntingSkill']
                }
            ]
        },
        Dog: {
            description: 'A representation of a dog',
            allOf: [
                {
                    $ref: '#/definitions/Pet'
                },
                {
                    type: 'object',
                    properties: {
                        packSize: {
                            type: 'integer',
                            format: 'int32',
                            description: 'the size of the pack the dog is from',
                            default: 0,
                            minimum: 0
                        }
                    },
                    required: ['packSize']
                }
            ]
        }
    }
};
//# sourceMappingURL=polymorphism.test-data.js.map