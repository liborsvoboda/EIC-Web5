export declare const getOptions: (mode: string) => {
    mode: string;
    value: string;
    theme: string;
    keyMap: string;
    indentUnit: number;
    lineNumbers: boolean;
    dragDrop: boolean;
    showCursorWhenSelecting: boolean;
    autoCloseBrackets: boolean;
    matchTags: {
        bothTags: boolean;
    };
    autoRefresh: boolean;
    extraKeys: {
        Tab: string;
        'Cmd-/': (cm: CodeMirror.Editor) => void;
    };
};
export declare const requireAddons: () => void;
