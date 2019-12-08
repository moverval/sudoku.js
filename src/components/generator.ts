import Value from "./value";
import Box from "./box";
import Table from "./table";

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

    copyTableArray(table: Table) {
        const arr: Box[] = [];
        for(let i = 0; i < 81; i++) {
            const value = new Value(table.real[i].get());
            const box = new Box(value);
            arr.push(box);
        }
        return arr;
    }
}