import React, { ButtonHTMLAttributes, CSSProperties } from 'react';
declare type BaseProps = {
    textStyle?: CSSProperties;
    title?: string;
    children: React.ReactNode;
};
declare type AnchorProps = BaseProps & {
    href: string;
};
declare type ButtonProps = BaseProps & {
    type?: ButtonHTMLAttributes<unknown>['type'];
    onClick?: () => void;
};
declare const _default: (props: AnchorProps | ButtonProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
