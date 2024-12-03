import { EnvironmentOptions, IEnvironment } from './IEnvironment';
export declare class HTMLEnvironment implements IEnvironment {
    initialize({ id, sharedEnvironment, styles, }: EnvironmentOptions): Promise<void>;
}
declare const _default: HTMLEnvironment;
export default _default;
