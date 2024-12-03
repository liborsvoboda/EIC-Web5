import { PublicError } from '../components/workspace/Workspace';
import { LogCommand } from '../types/Messages';
import { Tab } from '../utils/Tab';
export declare const types: {
    readonly COMPILED: "COMPILED";
    readonly TRANSPILED: "TRANSPILED";
    readonly BABEL_CODE: "BABEL_CODE";
    readonly BABEL_ERROR: "BABEL_ERROR";
    readonly CODE_CHANGE: "CODE_CHANGE";
    readonly PLAYER_RUN: "PLAYER_RUN";
    readonly PLAYER_ERROR: "PLAYER_ERROR";
    readonly CONSOLE_APPEND: "CONSOLE_APPEND";
    readonly CONSOLE_CLEAR: "CONSOLE_CLEAR";
    readonly OPEN_EDITOR_TAB: "OPEN_EDITOR_TAB";
};
export declare const actionCreators: {
    compiled: (filename: string, code: string) => {
        type: "COMPILED";
        filename: string;
        code: string;
    };
    transpiled: (filename: string, code: string) => {
        type: "TRANSPILED";
        filename: string;
        code: string;
    };
    compilerSuccess: (filename: string) => {
        type: "BABEL_CODE";
        filename: string;
    };
    compilerError: (filename: string, message: string) => {
        type: "BABEL_ERROR";
        filename: string;
        message: string;
    };
    codeChange: (filename: string, code: string) => {
        type: "CODE_CHANGE";
        filename: string;
        code: string;
    };
    playerRun: () => {
        type: "PLAYER_RUN";
    };
    playerError: (message: string) => {
        type: "PLAYER_ERROR";
        message: string;
    };
    consoleAppend: (command: LogCommand) => {
        type: "CONSOLE_APPEND";
        command: LogCommand;
    };
    consoleClear: () => {
        type: "CONSOLE_CLEAR";
    };
    openEditorTab: (tab: Tab) => {
        type: "OPEN_EDITOR_TAB";
        tab: Tab;
    };
};
declare type ValueOf<T> = T[keyof T];
export declare type Action = ReturnType<ValueOf<typeof actionCreators>>;
export interface State {
    codeVersion: number;
    compilerError?: PublicError;
    runtimeError?: PublicError;
    logs: LogCommand[];
    activeFile: string;
    codeCache: Record<string, string>;
    playerCache: Record<string, string>;
    transpilerCache: Record<string, string>;
    fileTabs: Tab[];
    activeFileTab?: Tab;
}
export declare const initialState: ({ initialTab, fileTabs, }: {
    initialTab: string;
    fileTabs: Tab[];
}) => State;
export declare function reducer(state: State, action: Action): State;
export {};
