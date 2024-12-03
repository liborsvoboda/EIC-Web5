import { CSSProperties } from 'react';
import { ExternalModule } from '../components/player/VendorComponents';
import { PublicOptions } from './options';
export interface ConsoleOptions {
    showFileName: boolean;
    showLineNumber: boolean;
    renderReactElements: boolean;
}
export interface EmbeddedPaneOptions {
    visible: boolean;
    maximized: boolean;
    collapsible: boolean;
}
export declare type EmbeddedConsoleOptions = ConsoleOptions & EmbeddedPaneOptions;
export declare type PaneBaseOptions = {
    id: string;
    title?: string;
    style?: CSSProperties;
};
export declare type StackPaneOptions = PaneBaseOptions & {
    type: 'stack';
    children: PaneOptions[];
};
export declare type EditorPaneOptions = PaneBaseOptions & {
    type: 'editor';
    fileList?: 'tabs' | 'sidebar';
};
export declare type TranspilerPaneOptions = PaneBaseOptions & {
    type: 'transpiler';
};
export declare type PlayerPaneOptions = PaneBaseOptions & {
    type: 'player';
    platform?: string;
    scale?: number;
    width?: number;
    assetRoot?: string;
    modules?: ExternalModule[];
    styleSheet?: string;
    css?: string;
    prelude?: string;
    statusBarHeight?: number;
    statusBarColor?: string;
    console?: EmbeddedConsoleOptions;
    reloadable?: boolean;
};
export declare type WorkspacesPaneOptions = PaneBaseOptions & {
    type: 'workspaces';
};
export declare type ConsolePaneOptions = PaneBaseOptions & ConsoleOptions & {
    type: 'console';
};
export declare type PaneOptions = StackPaneOptions | EditorPaneOptions | TranspilerPaneOptions | PlayerPaneOptions | WorkspacesPaneOptions | ConsolePaneOptions;
export declare type PaneShorthand = PaneOptions['type'];
export declare const containsPane: (panes: PaneOptions[], target: string) => boolean;
/**
 * Turn panes into objects, and assign a unique id to each.
 */
export declare const normalizePane: (pane: PaneShorthand | PaneOptions, publicOptions: PublicOptions) => PaneOptions;
