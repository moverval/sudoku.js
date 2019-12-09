export default class Value<T> {
    value: T;
    solid: boolean;
    solved: boolean;
    constructor(value: T);
    get(): T;
    set(value: T): void;
    isSolid(): boolean;
    wasSolved(): boolean;
}
export declare type NumberValue = Value<number>;
