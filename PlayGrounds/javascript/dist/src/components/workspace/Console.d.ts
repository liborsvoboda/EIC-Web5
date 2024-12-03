import React, { PureComponent, CSSProperties } from 'react';
import { LogCommand } from '../../types/Messages';
interface Props {
    maximize: boolean;
    showFileName: boolean;
    showLineNumber: boolean;
    renderReactElements: boolean;
    logs: LogCommand[];
    style?: CSSProperties;
    rowStyle?: CSSProperties;
}
export default class extends PureComponent<Props> {
    static defaultProps: {
        maximize: boolean;
        showFileName: boolean;
        showLineNumber: boolean;
        logs: never[];
    };
    container: React.RefObject<HTMLDivElement>;
    getComputedStyle: () => (React.CSSProperties & {
        _prefixed?: boolean | undefined;
    }) | {
        position: "absolute";
        zIndex: number;
        overflow: "auto";
        boxSizing: "border-box";
        padding: string;
        left: number;
        right: number;
        bottom: number;
        height: string;
        borderTop: string;
        background: string;
    } | {
        position: "absolute";
        zIndex: number;
        overflow: "auto";
        boxSizing: "border-box";
        padding: string;
        left: number;
        right: number;
        bottom: number;
        height: string;
        background: string;
        borderLeft: string;
    };
    getComputedRowStyle: () => (React.CSSProperties & {
        _prefixed?: boolean | undefined;
    }) | {
        display: "flex";
        boxSizing: "border-box";
        boxShadow: "0 -1px 0 0 rgb(240,240,240) inset";
        padding: string;
        whiteSpace: "pre";
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    renderEntry: (entry: LogCommand) => JSX.Element | undefined;
    render(): JSX.Element;
}
export {};
