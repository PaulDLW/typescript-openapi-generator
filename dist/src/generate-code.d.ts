import { ApiDefinition } from './common/models/api-definition.model';
export declare function generateCode(apiDefinition: ApiDefinition, generator: string, dirName: string): {
    name: string;
    content: string;
}[];
