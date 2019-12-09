import { NumberValue } from "./value";
export declare type BoxQueue = Box[];
export default class Box {
    value: NumberValue;
    changeable: boolean;
    constructor(value: NumberValue);
    isChangeable(): boolean;
    get(): number;
    set(value: number): void;
    isEmpty(): boolean;
}
