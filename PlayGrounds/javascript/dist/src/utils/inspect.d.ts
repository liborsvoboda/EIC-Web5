declare type PublicSpan = {
    value: string;
    style: string;
};
declare type Options = {
    showHidden?: boolean;
    depth?: number;
    colors?: boolean;
    customInspect?: boolean;
    bracketSeparator?: string;
    maxLineLength?: number;
};
/**
 * Print a value out in the best way possible for its type.
 *
 * @param {unknown} value The value to print out.
 * @param {Options} options Optional options object that alters the output.
 * @license MIT (© Joyent)
 */
declare function inspect(value: unknown, options?: Options): PublicSpan[];
declare namespace inspect {
    let styles: Record<string, string>;
}
export default inspect;
