import { CSSProperties } from 'react';
export interface TooltipValue {
    getNode: (cm: CodeMirror.Editor, options: {
        index: number;
    }, callback: (node: HTMLElement) => void) => void;
    getContainerNode?: () => HTMLElement;
    removeNode: (node: HTMLElement) => void;
    style?: CSSProperties;
}
export declare function tooltipAddon(): void;
