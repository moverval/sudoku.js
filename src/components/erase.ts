import Table from "./table";
import Backtrack from "./backtrack";

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
        CLEAN: 50,
        NORMAL: 10,
        FAST: 5
    };

    static createFillable(table: Table, iterations: number, timeout: number = 10) {
        let count = 0;
        let failed = 0;

        while(count < iterations) {
            const random = Math.round(Math.random() * 80);
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