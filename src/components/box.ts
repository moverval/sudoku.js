import { NumberValue } from "./value";

export type BoxQueue = Box[];

export default class Box {
    value: NumberValue;
    changeable: boolean;

    constructor(value: NumberValue) {
        this.value = value;
    }

    isChangeable() {
        return this.changeable;
    }

    get(): number {
        return this.value.get();
    }

    set(value: number): void {
        this.value.set(value);
    }

    isEmpty() {
        return this.get() === 0;
    }
}