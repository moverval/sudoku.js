import Value, { NumberValue } from "./value";

export type BoxQueue = Box[];

export default class Box {
    value: NumberValue;

    constructor(value: NumberValue) {
        this.value = value;
    }

    get(): number {
        return this.value.get();
    }

    set(value: number): void {
        this.value.set(value);
    }
}