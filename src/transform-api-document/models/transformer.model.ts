import { ApiDefinition } from '../../common/models';

export interface Transformer {
  transform: () => ApiDefinition;
}
