import type * as Diff from 'diff';
export declare type DiffRange = [number, number];
export declare type ExtendedChange = Diff.Change & {
    ranges: DiffRange[];
};
export declare type DiffResult = {
    value: string;
    ranges: DiffRange[];
};
export declare type LineDiff = {
    added: DiffRange[];
};
export default function changedRanges(originalText: string, newText: string): LineDiff;
