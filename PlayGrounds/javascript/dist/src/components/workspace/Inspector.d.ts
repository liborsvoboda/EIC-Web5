import { PureComponent } from 'react';
export declare const Inspector: any;
interface Props {
    data: unknown[];
    inspector: 'browser' | 'node';
    renderReactElements: boolean;
    expandLevel?: number;
}
export declare class MultiInspector extends PureComponent<Props> {
    render(): JSX.Element[];
}
export {};
