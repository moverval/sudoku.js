import { NumberValue } from "./value";
export declare type BoxQueue = Box[];
export default class Box {
    value: NumberValue;
    constructor(value: NumberValue);
    get(): number;
    set(value: number): void;
}
