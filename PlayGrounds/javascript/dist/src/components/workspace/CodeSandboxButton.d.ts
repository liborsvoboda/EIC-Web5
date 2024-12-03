import React, { CSSProperties } from 'react';
interface Props {
    files: Record<string, string>;
    textStyle?: CSSProperties;
    children?: React.ReactNode;
}
export declare const CodeSandboxButton: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export {};
