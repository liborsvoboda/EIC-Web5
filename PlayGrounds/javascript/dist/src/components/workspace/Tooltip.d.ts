import React from 'react';
import type * as ts from 'typescript';
interface Props {
    type?: ts.SymbolDisplayPart[];
    documentation?: ts.SymbolDisplayPart[];
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
