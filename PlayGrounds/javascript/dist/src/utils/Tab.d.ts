export interface Tab {
    index: number;
    title: string;
    changed: boolean;
}
export declare const compareTabs: (a: Tab, b: Tab) => boolean;
export declare const getTabTitle: (tab: Tab) => string;
export declare const getTabChanged: (tab: Tab) => boolean;
