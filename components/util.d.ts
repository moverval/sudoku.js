export declare function shuffle<T>(array: T[]): T[];
export interface PerspectiveData {
    x: number;
    y: number;
    boxArrayIndex: number;
    boxIndex: number;
    index: number;
}
export interface CasteData extends PerspectiveData {
    boxX: number;
    boxY: number;
    innerX: number;
    innerY: number;
}
export declare function indexToCasteData(index: number): CasteData;
export declare function casteToIndexData(boxArrayIndex: number, boxIndex: number): CasteData;
export declare function indexToRcData(index: number, rc: boolean): PerspectiveData;
export declare function rcToIndexData(boxArrayIndex: number, boxIndex: number, rc: boolean): PerspectiveData;
export declare function rowToIndexData(boxArrayIndex: number, boxIndex: number): PerspectiveData;
export declare function columnToIndexData(boxArrayIndex: number, boxIndex: number): PerspectiveData;
export declare function indexToRowData(index: number): PerspectiveData;
export declare function indexToColumnData(index: number): PerspectiveData;
