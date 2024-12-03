import React from 'react';
import { WorkspacesPaneOptions } from '../../../utils/Panes';
import { Step } from '../WorkspacesList';
import { ExternalStyles } from '../Workspace';
interface Props {
    options: WorkspacesPaneOptions;
    externalStyles: ExternalStyles;
    activeStepIndex: number;
    workspaces: Step[];
    onChangeActiveStepIndex: (index: number) => void;
}
declare const _default: (props: Props) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default _default;
