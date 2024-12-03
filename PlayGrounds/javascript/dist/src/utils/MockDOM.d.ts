/**
 * We create a fake DOM for Python, since it runs in a web worker for performance.
 * Fortunately only a small amount of APIs are needed to support figure generation.
 * A different approach (e.g. bridging API calls into the main thread) might work
 * better for complex DOM manipulation.
 */
declare class TokenList {
    add(): void;
}
declare class DOMElement {
    id?: string;
    type: string;
    children: DOMElement[];
    attributes: Record<string, unknown>;
    style: Record<string, unknown>;
    classList: TokenList;
    constructor(type: string);
    appendChild(child: DOMElement): void;
    setAttribute(key: string, value: unknown): void;
    addEventListener(): void;
    scrollIntoView(): void;
}
declare class DOMHeadElement extends DOMElement {
    constructor();
    appendChild(child: DOMElement): void;
}
declare class Context2D {
    _id: string;
    clearRect(): void;
    strokeRect(): void;
    setLineDash(): void;
    putImageData(imageData: ImageData): void;
    getImageData(): ImageData;
}
export declare class DOMCanvasElement extends DOMElement {
    constructor();
    getContext(): Context2D;
    private _context;
}
export declare const document: {
    head: DOMHeadElement;
    createTextNode: (text: string) => string;
    createElement: (type: string) => DOMElement;
    getElementById: (id: string) => DOMElement | undefined;
};
export declare function reset(): void;
export {};
