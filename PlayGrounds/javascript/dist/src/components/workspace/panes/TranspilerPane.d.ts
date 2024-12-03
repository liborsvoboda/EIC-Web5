import React from 'react';
import { TranspilerPaneOptions } from '../../../utils/Panes';
import type { ExternalStyles, PlaygroundOptions } from '../Workspace';
interface Props {
    options: TranspilerPaneOptions;
    externalStyles: ExternalStyles;
    activeFile: string;
    transpilerCache: Record<string, string>;
    playgroundOptions: PlaygroundOptions;
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
