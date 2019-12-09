import Table from "./table";
import Backtrack from "./backtrack";
import { shuffle, indexToRowData, indexToColumnData, indexToCasteData } from "./util";

export default class Erase {
    static HARDEST = 81;
    static MIDDLE = 50;
    static EASY = 25;

    static Mode = {
        HARDEST: 81,
        MIDDLE: 50,
        EASY: 25
    };

    static Checkover = {
        CLEAN: 40,
        NORMAL: 20,
        FAST: 5
    };

    static EraseRandomIteration(table: Table) {
        for(let i = 0; i < 81; i++) {
            const erase = Math.round(Math.random() * 1);
            if(erase) {
                const char = table.real[i].get();
                table.real[i].set(0);
                if(!Backtrack.full(table, Backtrack.SolveCheck)) {
                    table.real[i].set(char);
                }
            }
        }
    }

    static EraseEveryIteration(table: Table) {
        for(let i = 0; i < 81; i++) {
            const char = table.real[i].get();
            table.real[i].set(0);
            if(!Backtrack.full(table, Backtrack.SolveCheck)) {
                table.real[i].set(char);
            }
        }
    }

    static createHardFillable(table: Table) {
        this.EraseRandomIteration(table);
        this.EraseEveryIteration(table);

        return true;
    }

    static createFillable(table: Table, iterations: number, timeout: number = 10) {
        let count = 0;
        let failed = 0;
        const alreadyUsed = new Set();

        while(count < iterations) {
            let random = Math.round(Math.random() * 80);
            const upOrDown = Math.round(Math.random() * 1);

            while(alreadyUsed.has(random) && alreadyUsed.size < 81) {
                if(upOrDown) {
                    if(random < 80) {
                        random++;
                    } else {
                        random = 0;
                    }
                } else {
                    if(random > 0) {
                        random--;
                    } else {
                        random = 80;
                    }
                }
            }
            alreadyUsed.add(random);

            if(!table.real[random].isEmpty()) {
                const value = table.real[random].get();
                table.real[random].set(0);
                if(!Backtrack.full(table, Backtrack.SolveCheck)) {
                    table.real[random].set(value);
                    ++failed;
                    if(failed === timeout) {
                        return false;
                    }
                } else {
                    failed = 0;
                    count++;
                }
            }
        }

        return true;
    }
}