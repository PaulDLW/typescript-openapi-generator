export const polymorphismOutput = {
  models: [
    {
      className: 'Pet',
      extends: [],
      fileName: 'pet.model.ts',
      fileNameNoExt: 'pet.model',
      modelReferences: [],
      properties: [
        {
          name: 'name',
          required: true,
          type: 'string'
        },
        {
          name: 'petType',
          required: true,
          type: 'string'
        }
      ],
      type: 'object'
    },
    {
      className: 'Cat',
      extends: ['Pet'],
      fileName: 'cat.model.ts',
      fileNameNoExt: 'cat.model',
      modelReferences: [],
      properties: [
        {
          name: 'huntingSkill',
          required: true,
          type: 'string'
        }
      ],
      type: 'object'
    },
    {
      className: 'Dog',
      extends: ['Pet'],
      fileName: 'dog.model.ts',
      fileNameNoExt: 'dog.model',
      modelReferences: [],
      properties: [
        {
          name: 'packSize',
          required: true,
          type: 'integer'
        }
      ],
      type: 'object'
    }
  ],
  paths: []
};
