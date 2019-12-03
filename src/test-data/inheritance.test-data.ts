export const inheritanceInput = {
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
    ErrorModel: {
      type: 'object',
      required: ['message', 'code'],
      properties: {
        message: {
          type: 'string'
        },
        code: {
          type: 'integer',
          minimum: 100,
          maximum: 600
        }
      }
    },
    ExtendedErrorModel: {
      allOf: [
        {
          $ref: '#/definitions/ErrorModel'
        }
      ],
      type: 'object',
      required: ['rootCause'],
      properties: {
        rootCause: {
          type: 'string'
        }
      }
    }
  }
};
