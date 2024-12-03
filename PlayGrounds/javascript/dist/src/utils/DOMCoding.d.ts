declare type NodeObject = {
    nodeType: number;
    tagName?: string;
    nodeName?: string;
    nodeValue?: string;
    attributes?: [string, unknown][];
    childNodes?: unknown[];
};
/**
 * Serialize a DOM element as JSON
 */
export declare function toJSON(node: HTMLElement): NodeObject;
/**
 * Deserialize a DOM element
 */
export declare function toDOM(input: any): HTMLElement | Text | Comment | DocumentFragment;
export {};
