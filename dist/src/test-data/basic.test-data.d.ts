export declare const basicInput: {
    swagger: string;
    info: {
        description: string;
        version: string;
        title: string;
    };
    basePath: string;
    tags: never[];
    schemes: string[];
    paths: {
        '/health-check': {
            get: {
                responses: {
                    '200': {
                        description: string;
                    };
                };
                produces: string[];
                consumes: string[];
            };
        };
    };
    definitions: {
        TestReference: {
            type: string;
        };
        TestObject: {
            type: string;
            properties: {
                testNumber: {
                    type: string;
                };
                testBoolean: {
                    type: string;
                };
                testString: {
                    type: string;
                };
                testReferance: {
                    $ref: string;
                };
            };
            required: string[];
        };
    };
};
