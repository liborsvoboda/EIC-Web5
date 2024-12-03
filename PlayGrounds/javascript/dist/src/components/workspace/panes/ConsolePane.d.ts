import React from 'react';
import { LogCommand } from '../../../types/Messages';
import { ConsolePaneOptions } from '../../../utils/Panes';
import { ExternalStyles } from '../Workspace';
interface Props {
    options: ConsolePaneOptions;
    externalStyles: ExternalStyles;
    files: Record<string, string>;
    logs: LogCommand[];
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
