import Box, { BoxQueue } from "./box";
export declare type SudokuCheckList = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
export default class Perspective {
    queue: BoxQueue;
    set(value: number, box: Box): void;
    has(value: number): boolean;
    setRow(one: any, two: any, three: any, four: any, five: any, six: any, seven: any, eight: any, nine: any): void;
    get(value: number): Box;
    shuffleRow(): BoxQueue;
    fillRandom(): void;
    valid(value: number): boolean;
}
