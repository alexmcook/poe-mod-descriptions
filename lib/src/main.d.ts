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
export declare function getTranslation(...ids: string[]): void;
export declare function translationN(n: number): any;
