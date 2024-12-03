export declare type DirectoryEntry = string | Directory;
export interface Directory {
    [key: string]: DirectoryEntry;
}
export declare function contains<T extends string>(directory: Directory, name: T): directory is Directory & {
    [key in T]: DirectoryEntry;
};
export declare function hasFile<T extends string>(directory: Directory, name: T): directory is Directory & {
    [key in T]: string;
};
export declare function hasDirectory<T extends string>(directory: Directory, name: T): directory is Directory & {
    [key in T]: Directory;
};
export declare function locate(directory: Directory, filepath: string): {
    parent: Directory;
    name: string;
} | undefined;
export declare function exists(directory: Directory, filepath: string): boolean;
export declare function getDirectory(directory: Directory, filepath: string): Directory | undefined;
export declare function getFile(directory: Directory, filepath: string): string | undefined;
export declare function makeDirectory(directory: Directory, filepath: string): void;
export declare function readDirectory(directory: Directory, filepath: string): string[];
export declare function writeFile(directory: Directory, filepath: string, data: string): void;
export declare function getPaths(directory: Directory): string[];
export declare function create(): Directory;
