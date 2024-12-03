import React, { ReactNode } from 'react';
interface Props {
    width: number;
    device: string;
    scale: number;
    children?: ReactNode;
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
