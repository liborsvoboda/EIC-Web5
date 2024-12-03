/// <reference types="react" />
import type { PlaygroundOptions } from './Workspace';
interface Props {
    indent: number;
    data: unknown[];
    didResize: () => void;
    playgroundOptions: PlaygroundOptions;
}
export default function PlaygroundPreview({ indent, data, didResize, playgroundOptions, }: Props): JSX.Element;
export {};
