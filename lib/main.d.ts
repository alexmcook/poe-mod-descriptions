export interface Translation {
    ids: string[];
    descriptions: Description[];
}
export interface Description {
    conditions: Condition[];
    formats: string[];
    indexHandlers: string[];
    text: string;
}
export interface Condition {
    min: number;
    max: number;
}
export interface Mod {
    id: string;
    stats: Stat[];
}
export interface Stat {
    id: string;
    key: number;
    value?: number;
    valueMin: number;
    valueMax: number;
}
export interface Text {
    text: string;
    crafted: boolean;
}
export interface Range {
    min: number;
    max: number;
}
export interface RangeString {
    min: string;
    max: string;
}
export declare function getDescriptions(mods: Mod[], noValue?: boolean): Text[];
