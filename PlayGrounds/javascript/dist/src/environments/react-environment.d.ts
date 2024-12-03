import { AfterEvaluateOptions, BeforeEvaluateOptions, JavaScriptEnvironment } from './javascript-environment';
declare class ReactEnvironment extends JavaScriptEnvironment {
    beforeEvaluate({ host }: BeforeEvaluateOptions): void;
    afterEvaluate({ context, host }: AfterEvaluateOptions): void;
}
declare const _default: ReactEnvironment;
export default _default;
