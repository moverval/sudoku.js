import Box, { BoxQueue } from "./box";

export type SudokuCheckList = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export default class Perspective {
    queue: BoxQueue = [];

    set(value: number, box: Box) {
        this.queue[value] = box;
    }

    has(value: number) {
        return this.queue[value] != null;
    }

    setRow(one, two, three, four, five, six, seven, eight, nine) {
        this.queue[0] = one;
        this.queue[1] = two;
        this.queue[2] = three;
        this.queue[3] = four;
        this.queue[4] = five;
        this.queue[5] = six;
        this.queue[6] = seven;
        this.queue[7] = eight;
        this.queue[8] = nine;
    }

    get(value: number) {
        return this.queue[value];
    }

    shuffleRow() {
        let tmp: number;
        let current;
        let top = this.queue.length;

        if(top) {
            while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = this.queue[current].get();
                this.queue[current].set(this.queue[top].get());
                this.queue[top].set(tmp);
            }
        }
        return this.queue;
    }

    fillRandom() {
        for(let i = 0; i < 9; i++) {
            this.queue[i].set(i + 1);
            if(i === 8) {
                this.queue = this.shuffleRow();
            }
        }
    }

    valid(value: number) {
        return this.queue.every((box) => box.get() !== value);
    }
}