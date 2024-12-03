export declare type PythonMessage = {
    type: 'init';
} | {
    type: 'run';
    code: string;
    requestId: number;
};
export declare type PythonResponse = {};
export declare type TransferableImage = {
    marker: '__rnwp_transferable_image__';
    buffer: Uint8ClampedArray;
    width: number;
    height: number;
};
