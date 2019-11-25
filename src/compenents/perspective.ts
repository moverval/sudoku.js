import Box, { BoxQueue } from "./box";

export type SudokuCheckList = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export default class Perspective {
    queue: BoxQueue = [];
    numbersUsed: SudokuCheckList = [false, false, false, false, false, false, false, false, false];
    fieldsUsed: SudokuCheckList = [false, false, false, false, false, false, false, false, false];

    set(value: number, box: Box) {
        this.queue[value] = box;
    }

    has(value: number) {
        return this.queue[value] != null;
    }

    get(value: number) {
        return this.queue[value];
    }

    fillRandom() {
        let exit = false;
        let count = 0;
        while(exit) {
            if(!this.queue[count]) {
                /// TODO Fix value setting
            }
            const box = this.queue[count];
            const random = Math.round(Math.random() * 9);
            if(!this.numbersUsed[random]) {
                box.set(random);
                if(count === this.queue.length) {
                    exit = true;
                }
                count++;
            }
        }
    }
}