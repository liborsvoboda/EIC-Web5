export declare type SourceLocation = {
    file: string;
    line: number;
    column: number;
};
declare type CommandBase = {
    id: string;
};
export declare type ClearCommand = CommandBase & {
    command: 'clear';
};
export declare type LogVisibility = 'visible' | 'hidden';
export declare type LogCommand = CommandBase & {
    command: 'log';
    location: SourceLocation;
    data: unknown[];
    visibility: LogVisibility;
};
export declare type ConsoleCommand = ClearCommand | LogCommand;
declare type MessageBase = {
    id: string;
    codeVersion: number;
};
export declare type ConsoleMessage = MessageBase & {
    type: 'console';
    payload: ConsoleCommand;
};
export declare type ReadyMessage = MessageBase & {
    type: 'ready';
};
export declare type ErrorMessage = MessageBase & {
    type: 'error';
    payload: string;
};
export declare type Message = ConsoleMessage | ReadyMessage | ErrorMessage;
export declare type MessageCallback = (message: Message) => void;
export {};
