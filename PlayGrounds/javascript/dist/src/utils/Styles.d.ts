import type { CSSProperties } from 'react';
declare type Style = CSSProperties & {
    _prefixed?: boolean;
};
export declare const prefix: (style: Style) => Style;
/**
 * Merge styles.
 *
 * If only a single style is passed, it may be returned directly
 * to avoid allocating another style and potentially hurting memoization in components.
 *
 * @param styles
 */
export declare const mergeStyles: (...styles: (Style | undefined)[]) => Style;
export declare const prefixObject: <T extends {
    [x: string]: Style;
}>(styles: T) => T;
export declare const prefixAndApply: (style: Style, node: ElementCSSInlineStyle) => void;
export declare const columnStyle: Style;
export declare const rowStyle: Style;
export {};
