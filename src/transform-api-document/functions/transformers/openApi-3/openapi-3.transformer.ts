import { Swagger2, ApiDefinition } from '../../../../common/models';
import { Transformer } from '../../../models/transformer.model';

export function openApiTransformer(apiObject: any): Transformer {
  return {
    transform: (): ApiDefinition => {
      return {
        models: [],
        paths: []
      };
    }
  };
}
