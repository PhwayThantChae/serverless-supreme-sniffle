export declare const success: (body: string) => {
    statusCode: number;
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Origin': string;
    };
    body: string;
};
export declare const failure: (body: string, statusCode?: number) => {
    statusCode: number;
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Methods': string;
        'Access-Control-Allow-Origin': string;
    };
    body: string;
};
