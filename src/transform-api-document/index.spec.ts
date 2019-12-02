import { transformApiDocument } from './index';
import {
  basicInput,
  basicOutput,
  inheritanceInput,
  polymorphismInput,
  inheritanceOutput,
  polymorphismOutput
} from '../test-data';

describe('transformApiDocument', () => {
  fit('should correctly transform a basic definition for swagger 2.0', () => {
    const result = transformApiDocument(basicInput);

    expect(result).toEqual(basicOutput);
  });

  it('should correctly transform a definition that has inheritance for swagger 2.0', () => {
    const result = transformApiDocument(inheritanceInput);

    expect(result).toEqual(inheritanceOutput);
  });

  it('should correctly transform a definition that has polymorphism for swagger 2.0', () => {
    const result = transformApiDocument(polymorphismInput);

    expect(result).toEqual(polymorphismOutput);
  });
});
