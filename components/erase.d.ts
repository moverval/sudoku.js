import Table from "./table";
export default class Erase {
    static HARDEST: number;
    static MIDDLE: number;
    static EASY: number;
    static Mode: {
        HARDEST: number;
        MIDDLE: number;
        EASY: number;
    };
    static Checkover: {
        CLEAN: number;
        NORMAL: number;
        FAST: number;
    };
    static EraseRandomIteration(table: Table): void;
    static EraseEveryIteration(table: Table): void;
    static createHardFillable(table: Table): boolean;
    static createFillable(table: Table, iterations: number, timeout?: number, variance?: number): boolean;
}
