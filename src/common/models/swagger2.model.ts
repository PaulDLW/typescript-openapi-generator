export interface Info {
  description: string;
  version: number;
  title: string;
}

export interface Parameter {
  name: string;
  in: string;
  required: boolean;
  type: string;
  schema: { $ref: string };
}

export interface Response {
  type: string;
  schema: { $ref: string; items: { $ref: string } };
}

export interface Responses {
  [key: string]: Response;
}

export interface Path {
  tags: string[];
  parameters: Parameter[];
  responses: Responses;
}

export interface HttpPath {
  [key: string]: Path;
}

export interface HttpPaths {
  [key: string]: HttpPath;
}

export type DefinitionType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array';

export class ItemsType {
  type?: string;
  $ref?: string;
}

export interface DefinitionProperty {
  type?: DefinitionType;
  items?: ItemsType;
  $ref?: string;
}

export interface DefinitionProperties {
  [key: string]: DefinitionProperty;
}

export interface Definition {
  type: DefinitionType;
  properties: DefinitionProperties;
  required: string[];
  allOf?: [{ $ref: string }];
}

export interface Definitions {
  [key: string]: Definition;
}

export interface Swagger2 {
  swagger: string;
  info: Info;
  basePath: string;
  tags: any[];
  schemes: string[];
  paths: HttpPaths;
  definitions: Definitions;
}
