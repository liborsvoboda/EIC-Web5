import * as ts from 'typescript';
declare type TSLanguageServiceHost = Parameters<typeof ts.createLanguageService>[0];
export default class LanguageServiceHost implements TSLanguageServiceHost {
    compilerOptions: ts.CompilerOptions;
    constructor(compilerOptions: ts.CompilerOptions);
    versions: Record<string, string>;
    fileExists(fileName: string): boolean;
    addFile(fileName: string, text: string, version?: string): void;
    getCompilationSettings(): ts.CompilerOptions;
    getScriptFileNames(): string[];
    getScriptVersion(fileName: string): string;
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
}
export {};
