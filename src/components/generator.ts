import Table from "./table";
import Row from "./row";
import Value from "./value";
import Box from "./box";

export default class Generator {
    generateTableArray() {
        const arr: Box[] = [];
        for(let i = 0; i < 81; i++) {
            const value = new Value(0);
            const box = new Box(value);
            arr.push(box);
        }
        return arr;
    }
}