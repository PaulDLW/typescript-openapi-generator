import { transformerFactory } from './functions/transformers/transformer.factory';

export function transformApiDocument(apiRawObject: any) {
  return transformerFactory(apiRawObject).transform();
}
