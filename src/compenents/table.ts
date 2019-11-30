import Row from "./row";
import Column from "./column";
import Caste from "./caste";
import Generator from "./generator";
import Box from "./box";
import { indexToCasteData } from "./util";

export interface TableOptions {
    generate: boolean;
    genAll: boolean;
}

export default class Table {
    rows: Row[] = [];
    columns: Column[] = [];
    castes: Caste[] = [];
    real: Box[] = [];
    generator: Generator;

    constructor(options: TableOptions = null) {
        this.generator = new Generator();
        this.real = this.generator.generateTableArray();
        this.generate();
    }

    generate() {
        for(let row = 0; row < 9; row++) {
            this.rows[row] = new Row();
            const point = row * 9;
            this.rows[row].setRow(this.real[point], this.real[point + 1], this.real[point + 2], this.real[point + 3], this.real[point + 4],
                                    this.real[point + 5], this.real[point + 6], this.real[point + 7], this.real[point + 8]);
            this.rows[row].fillRandom();
        }
        for(let column = 0; column < 9; column++) {
            this.columns[column] = new Column();
            const point = column;
            this.columns[column].setRow(this.real[point], this.real[point + 9], this.real[point + 9 * 2], this.real[point + 9 * 3], this.real[point + 9 * 4],
                this.real[point + 9 * 5], this.real[point + 9 * 6], this.real[point + 9 * 7], this.real[point + 9 * 8]);
        }
        for(let caste = 0; caste < 9; caste++) {
            // this.castes[caste].setRow(this.real[point], this.real[point + 1], this.real[point + 2], this.real[point + 3], this.real[point + 4],
            //     this.real[point + 5], this.real[point + 6], this.real[point + 7], this.real[point + 8]);
            for(let rowX = 0; rowX < 9; rowX++) {
                const point = caste * 9 + rowX;
                const casteData = indexToCasteData(point);
                if(!this.castes[casteData.boxArrayIndex]) {
                    this.castes[casteData.boxArrayIndex] = new Caste();
                }
                this.castes[casteData.boxArrayIndex].set(casteData.boxIndex, this.real[point]);
            }
        }
    }
}