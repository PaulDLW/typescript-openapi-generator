import { openApiTransformer } from './openApi-3/openapi-3.transformer';
import { swagger2Transformer } from './swagger-2/swagger2.transformer';

export function transformerFactory(apiRawObject: any) {
  if (isOpenApi3(apiRawObject)) {
    return openApiTransformer(apiRawObject);
  } else {
    return swagger2Transformer(apiRawObject);
  }
}

function isOpenApi3(apiRawObject: any) {
  return !!apiRawObject.openapi;
}
