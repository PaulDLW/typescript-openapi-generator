export const basicInput = {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: ''
  },
  basePath: '/',
  tags: [],
  schemes: ['http'],
  paths: {
    '/health-check': {
      get: {
        responses: {
          '200': {
            description: ''
          }
        },
        produces: ['application/json'],
        consumes: ['application/json']
      }
    }
  },
  definitions: {
    TestReference: {
      type: 'string'
    },
    TestObject: {
      type: 'object',
      properties: {
        testNumber: {
          type: 'number'
        },
        testBoolean: {
          type: 'boolean'
        },
        testString: {
          type: 'string'
        },
        testReferance: {
          $ref: '#/definitions/TestReference'
        }
      },
      required: ['testNumber', 'testBoolean']
    }
  }
};
