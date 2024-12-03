export declare function hasOwnProperty<O extends object, K extends PropertyKey>(obj: O, key: K): obj is O & {
    [key in K]: unknown;
};
export declare function fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): {
    [k: string]: T;
};
export declare function entries<T>(obj: {
    [s: string]: T;
} | ArrayLike<T>): [string, T][];
