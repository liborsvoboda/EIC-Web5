import { MessageCallback } from '../../types/Messages';
export declare type ConsoleProxy = Console & {
    _rnwp_log: Console['log'];
};
declare const consoleProxy: ConsoleProxy;
export declare const consoleLogRNWP: (callback: MessageCallback, id: string, codeVersion: number, file: string, line: number, column: number, visibility: 'visible' | 'hidden', ...logs: unknown[]) => void;
export declare const consoleLog: (callback: MessageCallback, id: string, codeVersion: number, visibility: 'visible' | 'hidden', ...args: unknown[]) => void;
export declare const consoleClear: (callback: MessageCallback, id: string, codeVersion: number) => void;
export default consoleProxy;
