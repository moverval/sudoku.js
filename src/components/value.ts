export default class Value<T> {
    value: T;
    solid: boolean;
    solved: boolean;

    constructor(value: T) {
        this.value = value;
    }

    get() {
        return this.value;
    }

    set(value: T) {
        this.value = value;
    }

    isSolid() {
        return this.solid;
    }

    wasSolved() {
        return this.solved;
    }
}

export type NumberValue = Value<number>;