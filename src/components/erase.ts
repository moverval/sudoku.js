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
        const alreadyUsed = [];

        while(count < iterations) {
            let random = Math.round(Math.random() * 80);
            const upOrDown = Math.round(Math.random() * 1);

            while(alreadyUsed.indexOf(random) >= 0) {
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
            alreadyUsed.push(random);

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