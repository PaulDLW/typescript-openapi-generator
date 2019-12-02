import { ApiDefinition } from '../common/models/api-definition.model';
import { createApiDefinitionFromSwagger2 } from './functions/swagger-2/create-api-definition-from-swagger-2.function';

export function transformApiDocument(apiRawObject: any) {
  let apiDefinition: ApiDefinition;

  if (isOpenApi3(apiRawObject)) {
    apiDefinition = createApiDefinitionFromSwagger2(apiRawObject);
  } else {
    apiDefinition = createApiDefinitionFromSwagger2(apiRawObject);
  }

  return apiDefinition;
}

function isOpenApi3(apiRawObject: any) {
  return !!apiRawObject.openapi;
}
