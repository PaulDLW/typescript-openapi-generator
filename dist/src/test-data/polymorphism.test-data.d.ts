export declare const polymorphismInput: {
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
        Pet: {
            type: string;
            discriminator: string;
            properties: {
                name: {
                    type: string;
                };
                petType: {
                    type: string;
                };
            };
            required: string[];
        };
        Cat: {
            description: string;
            allOf: ({
                $ref: string;
                type?: undefined;
                properties?: undefined;
                required?: undefined;
            } | {
                type: string;
                properties: {
                    huntingSkill: {
                        type: string;
                        description: string;
                        default: string;
                        enum: string[];
                    };
                };
                required: string[];
                $ref?: undefined;
            })[];
        };
        Dog: {
            description: string;
            allOf: ({
                $ref: string;
                type?: undefined;
                properties?: undefined;
                required?: undefined;
            } | {
                type: string;
                properties: {
                    packSize: {
                        type: string;
                        format: string;
                        description: string;
                        default: number;
                        minimum: number;
                    };
                };
                required: string[];
                $ref?: undefined;
            })[];
        };
    };
};
