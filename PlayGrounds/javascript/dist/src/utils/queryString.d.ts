export declare type QueryParameters = Record<string, string>;
export declare function decode(string: string): Record<string, string>;
export declare function encode(params: Record<string, string | number | boolean>): string;
