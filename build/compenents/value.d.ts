export default class Value<T> {
    value: T;
    constructor(value: T);
    get(): T;
    set(value: T): void;
}
export declare type NumberValue = Value<number>;
