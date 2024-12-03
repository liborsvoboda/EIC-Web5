export declare type ExternalModuleShorthand = string;
export declare type ExternalModuleDescription = {
    name: string;
    url: string;
    globalName?: string;
};
export declare type ExternalModule = ExternalModuleShorthand | ExternalModuleDescription;
export default class VendorComponents {
    static get modules(): Record<string, string>;
    static register(name: string, value: unknown): void;
    static get(name: string): unknown;
    static define(name: string, code: string): void;
    static require(name: string): string;
    static loadModules(modules: ExternalModuleDescription[]): Promise<void[]>;
    static loadExternals(externals: (ExternalModuleDescription & {
        globalName: string;
    })[]): Promise<unknown>;
    static normalizeExternalModule(component: ExternalModule): ExternalModuleDescription;
    static load(components: ExternalModuleDescription[]): Promise<void>;
}
