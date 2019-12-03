import { Swagger2, ApiDefinition } from '../../../../common/models';
import { createApiModelsFromSwagger2 } from './create-api-models-from-swagger-2.functions';
import { createPathsFromSwagger2 } from './create-paths-from-swagger-2.function';
import { Transformer } from '../../../models/transformer.model';

export function swagger2Transformer(apiObject: Swagger2): Transformer {
  return {
    transform: (): ApiDefinition => {
      const models = createApiModelsFromSwagger2(apiObject);
      const paths = createPathsFromSwagger2(apiObject);

      return {
        models,
        paths
      };
    }
  };
}
