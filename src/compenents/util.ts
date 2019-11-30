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

export interface CasteData {
    y: number;
    x: number;
    boxX: number;
    boxY: number;
    innerX: number;
    innerY: number;
    boxArrayIndex: number;
    boxIndex: number;
}

export function indexToCasteData(index: number): CasteData { // Calculates real table data to caste data
    const x = Math.floor(index % 9);                // Calculate Column Gate
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
        boxIndex
    };
}