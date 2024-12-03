import React, { CSSProperties, ReactNode } from 'react';
interface Props<T> {
    tabs: T[];
    activeTab?: T;
    onClickTab: (tab: T) => void;
    getTitle: (a: T) => string;
    getChanged: (a: T) => boolean;
    compareTabs: (a: T, b: T) => boolean;
    textStyle?: CSSProperties;
    activeTextStyle?: CSSProperties;
    changedTextStyle?: CSSProperties;
    tabStyle?: CSSProperties;
    children?: ReactNode;
}
declare const _default: <T>(props: Props<T>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
