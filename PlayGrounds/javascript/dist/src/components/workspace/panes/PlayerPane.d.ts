import React from 'react';
import { ConsoleCommand, LogCommand } from '../../../types/Messages';
import PlayerFrame from '../PlayerFrame';
import { PlayerPaneOptions } from '../../../utils/Panes';
import { ExternalStyles } from '../Workspace';
import type { ExternalModule } from '../../player/VendorComponents';
export interface Props {
    options: PlayerPaneOptions;
    externalStyles: ExternalStyles;
    environmentName: string;
    sharedEnvironment: boolean;
    files: Record<string, string>;
    detectedModules: ExternalModule[];
    logs: LogCommand[];
    onPlayerRun: () => void;
    onPlayerReady: () => void;
    onPlayerReload: () => void;
    onPlayerError: (codeVersion: number, message: string) => void;
    onPlayerConsole: (codeVersion: number, payload: ConsoleCommand) => void;
}
declare const PlayerPane: (props: Props & React.RefAttributes<PlayerFrame>) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default PlayerPane;
