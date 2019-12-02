export const basicOutput = {
  models: [
    {
      className: 'TestReference',
      extends: [],
      fileName: 'test-reference.model.ts',
      modelReferences: [],
      properties: [],
      type: 'string'
    },
    {
      className: 'TestObject',
      extends: [],
      fileName: 'test-object.model.ts',
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
  paths: []
};
