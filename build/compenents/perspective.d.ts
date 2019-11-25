import Box, { BoxQueue } from "./box";
export declare type SudokuCheckList = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export default class Perspective {
    queue: BoxQueue;
    numbersUsed: SudokuCheckList;
    fieldsUsed: SudokuCheckList;
    set(value: number, box: Box): void;
    has(value: number): boolean;
    get(value: number): Box;
    fillRandom(): void;
}
