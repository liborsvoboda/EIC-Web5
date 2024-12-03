import React, { PureComponent } from 'react';
import { ConsoleCommand } from '../../types/Messages';
import { ExternalStyles } from './Workspace';
import type { ExternalModule } from '../player/VendorComponents';
interface Props {
    externalStyles: ExternalStyles;
    environmentName: string;
    platform: string;
    width: number;
    scale: number;
    assetRoot: string;
    statusBarHeight: number;
    statusBarColor: string;
    sharedEnvironment: boolean;
    detectedModules: ExternalModule[];
    modules: ExternalModule[];
    styleSheet: string;
    css: string;
    prelude: string;
    onRun: () => void;
    onReady: () => void;
    onConsole: (codeVersion: number, payload: ConsoleCommand) => void;
    onError: (codeVersion: number, payload: string) => void;
}
interface State {
    id: string | null;
}
export default class extends PureComponent<Props, State> {
    static defaultProps: {
        preset: string;
        platform: string;
        width: number;
        scale: number;
        assetRoot: string;
        statusBarHeight: number;
        statusBarColor: string;
        sharedEnvironment: boolean;
        modules: never[];
        styleSheet: string;
        css: string;
        prelude: string;
        onRun: () => void;
        onReady: () => void;
        onConsole: () => void;
        onError: () => void;
    };
    status: string;
    fileMap?: Record<string, string>;
    entry?: string;
    codeVersion?: number;
    state: State;
    iframe: React.RefObject<HTMLIFrameElement>;
    componentDidMount(): void;
    runApplication(fileMap: Record<string, string>, entry: string, codeVersion: number): void;
    reload(): void;
    renderFrame: () => JSX.Element | null;
    render(): JSX.Element | null;
}
export {};
