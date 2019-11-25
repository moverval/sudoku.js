import Row from "./row";
import Column from "./column";
import Caste from "./caste";

export interface TableOptions {
    generate: boolean;
    genAll: boolean;
}

export default class Table {
    rows: Row[] = [];
    columns: Column[] = [];
    castes: Caste[] = [];

    constructor(options: TableOptions = null) {
        if(options) {
            if(options.generate) {
                this.generate();
            }
        }
    }

    generate() {
        for(let row = 0; row < 9; row++) {
            this.rows[row] = new Row();
        }
        for(let column = 0; column < 9; column++) {
            this.columns[column] = new Column();
        }
        for(let caste = 0; caste < 9; caste++) {
            this.castes[caste] = new Caste();
        }
    }
}