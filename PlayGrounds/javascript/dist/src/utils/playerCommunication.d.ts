import { ConsoleProxy } from '../components/player/ConsoleProxy';
import { EvaluationContext } from '../environments/IEnvironment';
import { Message } from '../types/Messages';
export declare function sendMessage(sharedEnvironment: boolean, message: Message): void;
export declare function sendError(id: string, codeVersion: number, errorMessage: string): void;
export declare function createWindowErrorHandler({ codeVersion, id, prefixLineCount, }: {
    codeVersion: number;
    id: string;
    prefixLineCount: number;
}): (message: Event | string, _?: string | undefined, line?: number | undefined) => boolean;
export declare function bindConsoleLogMethods(options: {
    codeVersion: number;
    consoleProxy: ConsoleProxy;
    sharedEnvironment: boolean;
    id: string;
    prefixLineCount: number;
}): void;
/**
 * Every time we run the application, we re-bind all the logging and error message
 * handlers with a new `codeVersion`. This ensures that logs aren't stale. We also
 * include the iframe's id to handle the case of multiple preview iframes
 */
export declare function initializeCommunication({ id, sharedEnvironment, prefixLineCount, consoleProxy, onRunApplication, }: {
    id: string;
    sharedEnvironment: boolean;
    prefixLineCount: number;
    consoleProxy: ConsoleProxy;
    onRunApplication: (context: EvaluationContext) => void;
}): void;
/**
 * Enhance console logs to allow React elements to be rendered in the parent frame
 */
export declare function enhanceConsoleLogs(message: Message): void;
