import React, { ReactNode } from 'react';
import { StackPaneOptions, PaneOptions } from '../../../utils/Panes';
import { ExternalStyles } from '../Workspace';
interface Props {
    options: StackPaneOptions;
    externalStyles: ExternalStyles;
    renderPane: (pane: PaneOptions, index: number) => ReactNode;
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
