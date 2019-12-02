import { Swagger2, ApiDefinition } from '../../../common/models';
import { createApiModelsFromSwagger2 } from './create-api-models-from-swagger-2.functions';
import { createPathsFromSwagger2 } from './create-paths-from-swagger-2.function';

export function createApiDefinitionFromSwagger2(
  apiObject: Swagger2
): ApiDefinition {
  const models = createApiModelsFromSwagger2(apiObject);
  const paths = createPathsFromSwagger2(apiObject);

  return {
    models,
    paths
  };
}
