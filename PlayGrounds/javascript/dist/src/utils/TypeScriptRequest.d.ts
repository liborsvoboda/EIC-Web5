import type * as ts from 'typescript';
export declare type TypeScriptInitRequest = {
    type: 'init';
    libs: string[];
    types: {
        name: string;
        url: string;
    }[];
    compilerOptions: ts.CompilerOptions;
};
export declare type TypeScriptFileRequest = {
    type: 'files';
    files: Record<string, string>;
};
export declare type TypeScriptQuickInfoRequest = {
    type: 'quickInfo';
    filename: string;
    position: number;
};
export declare type TypeScriptCompileRequest = {
    type: 'compile';
    filename: string;
};
export declare type TypeScriptRequest = TypeScriptInitRequest | TypeScriptFileRequest | TypeScriptQuickInfoRequest | TypeScriptCompileRequest;
export declare type TypeScriptCodeResponse = {
    type: 'code';
    files: Record<string, string>;
};
export declare type TypeScriptErrorResponse = {
    type: 'error';
    error: {
        filename: string;
        message: string;
    };
};
export declare type TypeScriptResponse = TypeScriptCodeResponse | TypeScriptErrorResponse;
declare function typeScriptRequest(payload: TypeScriptQuickInfoRequest): Promise<ts.QuickInfo>;
declare function typeScriptRequest(payload: TypeScriptInitRequest): Promise<void>;
declare function typeScriptRequest(payload: TypeScriptFileRequest): Promise<void>;
declare function typeScriptRequest(payload: TypeScriptCompileRequest): Promise<TypeScriptResponse>;
export default typeScriptRequest;
