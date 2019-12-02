export function shuffle<T>(array: T[]) {
    let tmp;
    let current;
    let top = array.length;

    if(top) {
        while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    }
    return array;
}

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

export function indexToCasteData(index: number): CasteData { // Calculates real table data to caste data
    const x = index % 9;                            // Calculate Column Gate
    const y = Math.floor(index / 9);                // Calculate Row Gate
    const boxX = Math.ceil((x + 1) / 3) - 1;        // Coordinate Caste X
    const boxY = Math.ceil((y + 1) / 3) - 1;        // Coordinate Caste Y
    const boxArrayIndex = boxY * 3 + boxX;          // Caste Table Array Number
    const innerX = x - boxX * 3;
    const innerY = y - boxY * 3;
    const boxIndex = innerY * 3 + innerX;

    return {
        x, y,
        boxX, boxY,
        innerX, innerY,
        boxArrayIndex,
        boxIndex,
        index
    };
}

export function casteToIndexData(boxArrayIndex: number, boxIndex: number): CasteData {
    const boxY = Math.floor(boxArrayIndex / 3);
    const boxX = boxArrayIndex % 3;
    const innerY = Math.floor(boxIndex / 3);
    const innerX = boxIndex % 3;
    const x = boxX * 3 + innerX;
    const y = boxY * 3 + innerY;
    const index = y * 9 + x;

    return {
        x, y,
        boxX, boxY,
        innerX, innerY,
        boxArrayIndex,
        boxIndex,
        index
    };
}

export function indexToRcData(index: number, rc: boolean): PerspectiveData { // False = row : True = column
    const x = index % 9;
    const y = Math.floor(index / 9);

    return {
        x, y,
        boxArrayIndex: rc ? x : y,
        boxIndex: rc ? y : x,
        index
    };
}

export function rcToIndexData(boxArrayIndex: number, boxIndex: number, rc: boolean): PerspectiveData { // False = row : True = column
    const index = rc ? boxIndex * 9 + boxArrayIndex : boxArrayIndex * 9 + boxIndex;

    return {
        x: rc ? boxArrayIndex : boxIndex,
        y: rc ? boxIndex : boxArrayIndex,
        boxArrayIndex,
        boxIndex,
        index
    };
}

export function rowToIndexData(boxArrayIndex: number, boxIndex: number) {
    return rcToIndexData(boxArrayIndex, boxIndex, false);
}

export function columnToIndexData(boxArrayIndex: number, boxIndex: number) {
    return rcToIndexData(boxArrayIndex, boxIndex, true);
}

export function indexToRowData(index: number) {
    return indexToRcData(index, false);
}

export function indexToColumnData(index: number) {
    return indexToRcData(index, true);
}