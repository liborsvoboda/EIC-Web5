import { PureComponent, CSSProperties, MutableRefObject } from 'react';
import type * as CM from 'codemirror';
import type { DiffRange } from '../../utils/Diff';
import { LogCommand } from '../../types/Messages';
import type * as ts from 'typescript';
import type { PlaygroundOptions } from './Workspace';
export interface Props {
    filename: string;
    initialValue: string | null;
    value: string | null;
    onChange: (value: string) => void;
    readOnly: boolean;
    showDiff: boolean;
    diff: DiffRange[];
    logs?: LogCommand[];
    playgroundOptions: PlaygroundOptions;
    getTypeInfo?: (prefixedFilename: string, index: number, done: (info: ts.QuickInfo) => void) => void;
    tooltipStyle?: CSSProperties;
    errorLineNumber?: number;
}
export default class extends PureComponent<Props> {
    static defaultProps: {
        initialValue: null;
        value: null;
        onChange: () => void;
        readOnly: boolean;
        showDiff: boolean;
        diff: never[];
        logs: undefined;
        playgroundDebounceDuration: number;
        getTypeInfo: undefined;
        tooltipStyle: undefined;
        playgroundRenderReactElements: boolean;
    };
    currentDiff: DiffRange[];
    cm: CM.Editor;
    editorNode: MutableRefObject<HTMLDivElement | null>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateTimerId?: ReturnType<typeof setTimeout>;
    componentDidUpdate(): void;
    widgets: CM.LineWidget[];
    addPlaygroundWidgets(): void;
    highlightDiff(): void;
    componentWillUpdate(nextProps: Props): void;
    render(): JSX.Element;
}
