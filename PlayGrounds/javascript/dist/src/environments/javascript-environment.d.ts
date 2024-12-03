import { ExternalModuleDescription } from '../components/player/VendorComponents';
import type { EnvironmentOptions, EvaluationContext, IEnvironment } from './IEnvironment';
export interface BeforeEvaluateOptions {
    host: HTMLDivElement;
}
export interface AfterEvaluateOptions {
    context: EvaluationContext;
    host: HTMLDivElement;
}
export declare class JavaScriptEnvironment implements IEnvironment {
    /**
     * An arbitrary offset to error message line numbers that gets things to line up
     * with the code editor
     */
    prefixLineCount: number;
    nodeModules: Record<string, unknown>;
    initialize({ id, assetRoot, prelude, sharedEnvironment, statusBarColor, statusBarHeight, styles, modules, detectedModules, }: EnvironmentOptions): Promise<void>;
    hasModule: (name: string) => boolean;
    requireModule: (name: string) => unknown;
    loadExternalModules: ({ modules, detectedModules, hasModule, }: {
        modules: ExternalModuleDescription[];
        detectedModules: ExternalModuleDescription[];
        hasModule: (name: string) => boolean;
    }) => Promise<void>;
    beforeEvaluate(options: BeforeEvaluateOptions): void;
    afterEvaluate(options: AfterEvaluateOptions): void;
}
declare const _default: JavaScriptEnvironment;
export default _default;
