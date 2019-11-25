export default class Value<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    get() {
        return this.value;
    }

    set(value: T) {
        this.value = value;
    }
}

export type NumberValue = Value<number>;