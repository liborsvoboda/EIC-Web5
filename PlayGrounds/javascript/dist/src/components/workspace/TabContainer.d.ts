import React, { CSSProperties, ReactNode } from 'react';
interface Props<T> {
    tabs: T[];
    initialTab?: T;
    onClickTab?: (tab: T) => {};
    renderContent: (tab: T, index: number) => ReactNode;
    getTitle: (a: T) => string;
    compareTabs: (a: T, b: T) => boolean;
    renderHiddenContent: boolean;
    tabStyle?: CSSProperties;
    textStyle?: CSSProperties;
    activeTextStyle?: CSSProperties;
}
declare const _default: <T>(props: Props<T>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
