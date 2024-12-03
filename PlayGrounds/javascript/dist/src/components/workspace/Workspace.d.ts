import { CSSProperties } from 'react';
import { PaneOptions } from '../../utils/Panes';
import { WorkspaceStep, UserInterfaceStrings, CompilerOptions, TypeScriptOptions } from '../../utils/options';
import { WorkspaceDiff } from './App';
import type { ExternalModule } from '../player/VendorComponents';
export declare type ResponsivePaneSet = {
    maxWidth: number;
    panes: PaneOptions[];
};
export declare type PublicError = {
    lineNumber?: number;
    filename?: string;
    errorMessage: string;
    summary: string;
    description: string;
};
export interface PlaygroundOptions {
    enabled: boolean;
    inspector: 'browser' | 'node';
    renderReactElements: boolean;
    debounceDuration: number;
    instrumentExpressionStatements: boolean;
    expandLevel?: number;
}
export interface ExternalStyles {
    consolePane?: CSSProperties;
    consoleRow?: CSSProperties;
    header?: CSSProperties;
    headerText?: CSSProperties;
    playerHeader?: CSSProperties;
    playerHeaderText?: CSSProperties;
    playerPane?: CSSProperties;
    stackTab?: CSSProperties;
    stackTabText?: CSSProperties;
    stackTabTextActive?: CSSProperties;
    status?: CSSProperties;
    statusText?: CSSProperties;
    statusTextError?: CSSProperties;
    tab?: CSSProperties;
    tabText?: CSSProperties;
    tabTextActive?: CSSProperties;
    tabTextChanged?: CSSProperties;
    tooltip?: CSSProperties;
    transpilerHeader?: CSSProperties;
    transpilerHeaderText?: CSSProperties;
    workspacesButtonContainer?: CSSProperties;
    workspacesButtonText?: CSSProperties;
    workspacesButtonWrapper?: CSSProperties;
    workspacesDescription?: CSSProperties;
    workspacesDescriptionText?: CSSProperties;
    workspacesDivider?: CSSProperties;
    workspacesHeader?: CSSProperties;
    workspacesHeaderText?: CSSProperties;
    workspacesList?: CSSProperties;
    workspacesPane?: CSSProperties;
    workspacesRow?: CSSProperties;
    workspacesRowActive?: CSSProperties;
    workspacesRowTitle?: CSSProperties;
    workspacesRowTitleActive?: CSSProperties;
    playerRoot?: CSSProperties;
    playerWrapper?: CSSProperties;
    playerApp?: CSSProperties;
}
export interface Props {
    environmentName: string;
    title: string;
    files: Record<string, string>;
    entry: string;
    initialTab: string;
    strings: UserInterfaceStrings;
    onChange: (files: Record<string, string>) => void;
    externalStyles: ExternalStyles;
    fullscreen: boolean;
    sharedEnvironment: boolean;
    responsivePaneSets: ResponsivePaneSet[];
    compilerOptions: CompilerOptions;
    playgroundOptions: PlaygroundOptions;
    typescriptOptions: TypeScriptOptions;
    workspaces: WorkspaceStep[];
    diff: Record<string, WorkspaceDiff>;
    activeStepIndex: number;
    onChangeActiveStepIndex: (index: number) => void;
    detectedModules: ExternalModule[];
}
export default function Workspace(props: Props): JSX.Element;
