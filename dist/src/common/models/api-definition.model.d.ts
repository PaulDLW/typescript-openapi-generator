export interface ApiModelProperties {
    name: string;
    type: string;
    required: boolean;
}
export declare type ApiModelType = 'string' | 'number' | 'boolean' | 'array' | 'object';
export interface ApiModel {
    className: string;
    fileName: string;
    fileNameNoExt: string;
    type: ApiModelType;
    modelReferences: string[];
    properties: ApiModelProperties[];
    extends: string[];
}
export interface ApiParameter {
    type: string;
    name: string;
    required: boolean;
    in: string;
}
export interface PathModel {
    methodName: string;
    endpoint: string;
    httpVerb: string;
    parameters: ApiParameter[];
    bodyObject?: string;
    responseType: string;
}
export interface ServiceImport {
    name: string;
    path: string;
}
export interface ServiceModel {
    className: string;
    fileName: string;
    fileNameNoExt: string;
    paths: PathModel[];
    imports: ServiceImport[];
}
export interface ApiDefinition {
    models: ApiModel[];
    paths: ServiceModel[];
}
