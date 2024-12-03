export declare type BabelRequest = {
    filename: string;
    code: string;
    options?: {
        retainLines?: boolean;
        instrumentExpressionStatements?: boolean;
        maxLoopIterations?: number;
    };
};
declare type BabelResponseBase = {
    filename: string;
};
export declare type BabelCodeResponse = BabelResponseBase & {
    type: 'code';
    code: string;
};
export declare type BabelErrorResponse = BabelResponseBase & {
    type: 'error';
    error: {
        message: string;
    };
};
export declare type BabelResponse = BabelCodeResponse | BabelErrorResponse;
export default function babelRequest(payload: BabelRequest): Promise<BabelResponse>;
export {};
