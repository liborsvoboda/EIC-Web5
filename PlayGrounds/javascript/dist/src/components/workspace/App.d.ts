/// <reference types="react" />
import { DiffRange } from '../../utils/Diff';
import { InternalOptions } from '../../utils/options';
export declare type WorkspaceDiff = {
    type: 'added' | 'changed';
    ranges: DiffRange[];
};
declare type Props = Omit<InternalOptions, 'css' | '_css' | 'targetOrigin'> & {
    onChange: (files: Record<string, string>) => void;
};
export default function App({ environmentName, title, files, entry, initialTab, strings, styles, sharedEnvironment, fullscreen, responsivePaneSets, playground, workspaces, typescript, detectedModules, compiler, onChange, }: Props): JSX.Element;
export {};
