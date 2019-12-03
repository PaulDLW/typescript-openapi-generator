export const inheritanceOutput = {
  models: [
    {
      className: 'ErrorModel',
      extends: [],
      fileName: 'error-model.model.ts',
      fileNameNoExt: 'error-model.model',
      modelReferences: [],
      properties: [
        {
          name: 'message',
          required: true,
          type: 'string'
        },
        {
          name: 'code',
          required: true,
          type: 'integer'
        }
      ],
      type: 'object'
    },
    {
      className: 'ExtendedErrorModel',
      extends: ['ErrorModel'],
      fileName: 'extended-error-model.model.ts',
      fileNameNoExt: 'extended-error-model.model',
      modelReferences: [],
      properties: [
        {
          name: 'rootCause',
          required: true,
          type: 'string'
        }
      ],
      type: 'object'
    }
  ],
  paths: []
};
