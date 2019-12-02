export declare const inheritanceInput: {
    swagger: string;
    info: {
        description: string;
        version: string;
        title: string;
    };
    basePath: string;
    tags: never[];
    schemes: string[];
    paths: {};
    definitions: {
        ErrorModel: {
            type: string;
            required: string[];
            properties: {
                message: {
                    type: string;
                };
                code: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
            };
        };
        ExtendedErrorModel: {
            allOf: ({
                $ref: string;
                type?: undefined;
                required?: undefined;
                properties?: undefined;
            } | {
                type: string;
                required: string[];
                properties: {
                    rootCause: {
                        type: string;
                    };
                };
                $ref?: undefined;
            })[];
        };
    };
};
