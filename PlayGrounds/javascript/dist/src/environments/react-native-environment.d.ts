import type { EnvironmentOptions } from './IEnvironment';
import { AfterEvaluateOptions, BeforeEvaluateOptions, JavaScriptEnvironment } from './javascript-environment';
declare class ReactNativeEnvironment extends JavaScriptEnvironment {
    initialize(options: EnvironmentOptions): Promise<void>;
    beforeEvaluate({ host }: BeforeEvaluateOptions): void;
    afterEvaluate({ context, host }: AfterEvaluateOptions): void;
}
declare const _default: ReactNativeEnvironment;
export default _default;
