import type * as ts from 'typescript';
import { PlaygroundOptions, ResponsivePaneSet, ExternalStyles } from '../components/workspace/Workspace';
import { PaneOptions, PaneShorthand } from './Panes';
import type { ExternalModule } from '../components/player/VendorComponents';
export interface TypeScriptOptions {
    enabled?: boolean;
    libs?: string[];
    types?: {
        name: string;
        url: string;
    }[];
    compilerOptions?: ts.CompilerOptions;
}
export interface WorkspaceStep {
    title: string;
    description: string;
    workspace: {
        title: string;
        initialTab: string;
        entry: string;
        files: Record<string, string>;
    };
}
declare const userInterfaceStrings: {
    loading: string;
    about: string;
    noErrors: string;
    showDetails: string;
    fullscreen: string;
    openInNewWindow: string;
    codesandbox: string;
    reload: string;
};
export declare type UserInterfaceStrings = typeof userInterfaceStrings;
export interface CompilerOptions {
    type: 'none' | 'babel' | 'tsc';
    maxLoopIterations?: number;
}
export interface PublicOptions {
    preset?: string;
    environment?: string;
    title?: string;
    code?: string;
    files?: Record<string, string>;
    entry?: string;
    initialTab?: string;
    strings?: UserInterfaceStrings;
    css?: string;
    _css?: string;
    styles?: ExternalStyles;
    fullscreen?: boolean;
    codesandbox?: boolean;
    openInNewWindow?: boolean;
    sharedEnvironment?: boolean;
    reloadMode?: 'soft' | 'hard';
    compiler?: CompilerOptions;
    playground?: Partial<PlaygroundOptions>;
    typescript?: TypeScriptOptions;
    workspaces?: WorkspaceStep[];
    panes?: PublicPaneOptions[];
    responsivePaneSets?: PublicResponsivePaneSet[];
    detectDependencies?: boolean;
    modules?: ExternalModule[];
    targetOrigin?: string;
}
export declare type PublicPaneOptions = PaneShorthand | PaneOptions;
export declare type PublicResponsivePaneSet = {
    maxWidth: number;
    panes: PublicPaneOptions[];
};
export declare type InternalOptions = Required<Omit<PublicOptions, 'preset' | 'panes' | 'responsivePaneSets' | 'code' | 'detectDependencies' | 'modules' | 'environment' | 'playground'>> & {
    environmentName: string;
    responsivePaneSets: ResponsivePaneSet[];
    detectedModules: ExternalModule[];
    playground: PlaygroundOptions;
};
export declare function normalize(options: PublicOptions): InternalOptions;
/**
 * Get every file extension in options
 */
export declare function getFileExtensions(options: InternalOptions): string[];
export {};
