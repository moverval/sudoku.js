import Table from "./table";
import { PerspectiveData, rowToIndexData, indexToRowData, indexToColumnData, indexToCasteData } from "./util";

export type BacktrackAlgorithm = (table: Table, perspectiveData: PerspectiveData[]) => boolean;

export default class Backtrack {
    static full(table: Table, algorithm: BacktrackAlgorithm) {
        const data: PerspectiveData[] = [];
        for(let row = 0; row < 9; row++) {
            for(let index = 0; index < 9; index++) {
                if(table.rows[row].get(index).isEmpty()) {
                    data.push(rowToIndexData(row, index));
                }
            }
        }
        return algorithm(table, data);
    }

    static Generation(table: Table, perspectiveData: PerspectiveData[]) {
        const index = perspectiveData[0].index;
        const rowInfo = indexToRowData(index);
        const columnInfo = indexToColumnData(index);
        const casteInfo = indexToCasteData(index);

        let valid = false;
        let num = Math.round(Math.random() * 8) + 1;
        const started = num;
        let firstIteration = true;

        while(!valid) {
            if(table.rows[rowInfo.boxArrayIndex].valid(num)) {
                if(table.columns[columnInfo.boxArrayIndex].valid(num)) {
                    if(table.castes[casteInfo.boxArrayIndex].valid(num)) {
                        table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(num);
                        if(perspectiveData.length > 1) {
                            valid = Backtrack.Generation(table, perspectiveData.slice(1));
                        } else {
                            valid = true;
                        }
                    }
                }
            }

            if(!valid) {
                if(num < 9 && (num !== started || firstIteration)) {
                    ++num;
                } else if(num === started && !firstIteration) {
                    table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(0);
                    return false;
                } else {
                    num = 1;
                }
                firstIteration = false;
            }
        }

        return valid;
    }
}