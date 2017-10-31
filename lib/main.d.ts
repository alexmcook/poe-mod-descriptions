export interface Mod {
    id: string;
    stats: Stat[];
}
export interface Stat {
    id: string;
    key: number;
    value: number;
    valueMin: number;
    valueMax: number;
}
export declare function getDescriptions(mods: Mod[]): string[];
