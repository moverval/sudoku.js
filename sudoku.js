(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Sudoku = factory());
}(this, (function () { 'use strict';

    var Value = (function () {
        function Value(value) {
            this.value = value;
        }
        Value.prototype.get = function () {
            return this.value;
        };
        Value.prototype.set = function (value) {
            this.value = value;
        };
        Value.prototype.isSolid = function () {
            return this.solid;
        };
        Value.prototype.wasSolved = function () {
            return this.solved;
        };
        return Value;
    }());

    var Box = (function () {
        function Box(value) {
            this.value = value;
        }
        Box.prototype.isChangeable = function () {
            return this.changeable;
        };
        Box.prototype.get = function () {
            return this.value.get();
        };
        Box.prototype.set = function (value) {
            this.value.set(value);
        };
        Box.prototype.isEmpty = function () {
            return this.get() === 0;
        };
        return Box;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var Perspective = (function () {
        function Perspective() {
            this.queue = [];
        }
        Perspective.prototype.set = function (value, box) {
            this.queue[value] = box;
        };
        Perspective.prototype.has = function (value) {
            return this.queue[value] != null;
        };
        Perspective.prototype.setRow = function (one, two, three, four, five, six, seven, eight, nine) {
            this.queue[0] = one;
            this.queue[1] = two;
            this.queue[2] = three;
            this.queue[3] = four;
            this.queue[4] = five;
            this.queue[5] = six;
            this.queue[6] = seven;
            this.queue[7] = eight;
            this.queue[8] = nine;
        };
        Perspective.prototype.get = function (value) {
            return this.queue[value];
        };
        Perspective.prototype.shuffleRow = function () {
            var tmp;
            var current;
            var top = this.queue.length;
            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = this.queue[current].get();
                    this.queue[current].set(this.queue[top].get());
                    this.queue[top].set(tmp);
                }
            }
            return this.queue;
        };
        Perspective.prototype.fillRandom = function () {
            for (var i = 0; i < 9; i++) {
                this.queue[i].set(i + 1);
                if (i === 8) {
                    this.queue = this.shuffleRow();
                }
            }
        };
        Perspective.prototype.valid = function (value) {
            return this.queue.every(function (box) { return box.get() !== value; });
        };
        return Perspective;
    }());

    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Row;
    }(Perspective));

    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Column;
    }(Perspective));

    var Caste = (function (_super) {
        __extends(Caste, _super);
        function Caste() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Caste;
    }(Perspective));

    var Generator = (function () {
        function Generator() {
        }
        Generator.prototype.generateTableArray = function () {
            var arr = [];
            for (var i = 0; i < 81; i++) {
                var value = new Value(0);
                var box = new Box(value);
                arr.push(box);
            }
            return arr;
        };
        Generator.prototype.copyTableArray = function (table) {
            var arr = [];
            for (var i = 0; i < 81; i++) {
                var value = new Value(table.real[i].get());
                var box = new Box(value);
                arr.push(box);
            }
            return arr;
        };
        return Generator;
    }());

    function indexToCasteData(index) {
        var x = index % 9;
        var y = Math.floor(index / 9);
        var boxX = Math.ceil((x + 1) / 3) - 1;
        var boxY = Math.ceil((y + 1) / 3) - 1;
        var boxArrayIndex = boxY * 3 + boxX;
        var innerX = x - boxX * 3;
        var innerY = y - boxY * 3;
        var boxIndex = innerY * 3 + innerX;
        return {
            x: x, y: y,
            boxX: boxX, boxY: boxY,
            innerX: innerX, innerY: innerY,
            boxArrayIndex: boxArrayIndex,
            boxIndex: boxIndex,
            index: index
        };
    }
    function casteToIndexData(boxArrayIndex, boxIndex) {
        var boxY = Math.floor(boxArrayIndex / 3);
        var boxX = boxArrayIndex % 3;
        var innerY = Math.floor(boxIndex / 3);
        var innerX = boxIndex % 3;
        var x = boxX * 3 + innerX;
        var y = boxY * 3 + innerY;
        var index = y * 9 + x;
        return {
            x: x, y: y,
            boxX: boxX, boxY: boxY,
            innerX: innerX, innerY: innerY,
            boxArrayIndex: boxArrayIndex,
            boxIndex: boxIndex,
            index: index
        };
    }
    function indexToRcData(index, rc) {
        var x = index % 9;
        var y = Math.floor(index / 9);
        return {
            x: x, y: y,
            boxArrayIndex: rc ? x : y,
            boxIndex: rc ? y : x,
            index: index
        };
    }
    function rcToIndexData(boxArrayIndex, boxIndex, rc) {
        var index = rc ? boxIndex * 9 + boxArrayIndex : boxArrayIndex * 9 + boxIndex;
        return {
            x: rc ? boxArrayIndex : boxIndex,
            y: rc ? boxIndex : boxArrayIndex,
            boxArrayIndex: boxArrayIndex,
            boxIndex: boxIndex,
            index: index
        };
    }
    function rowToIndexData(boxArrayIndex, boxIndex) {
        return rcToIndexData(boxArrayIndex, boxIndex, false);
    }
    function columnToIndexData(boxArrayIndex, boxIndex) {
        return rcToIndexData(boxArrayIndex, boxIndex, true);
    }
    function indexToRowData(index) {
        return indexToRcData(index, false);
    }
    function indexToColumnData(index) {
        return indexToRcData(index, true);
    }

    var Table = (function () {
        function Table(table) {
            this.rows = [];
            this.columns = [];
            this.castes = [];
            this.real = [];
            this.generator = new Generator();
            if (typeof table !== "undefined" && typeof table.real !== "undefined") {
                this.real = this.generator.copyTableArray(table);
            }
            else {
                this.real = this.generator.generateTableArray();
            }
            this.generate();
        }
        Table.prototype.generate = function () {
            for (var row = 0; row < 9; row++) {
                this.rows[row] = new Row();
                var point = row * 9;
                this.rows[row].setRow(this.real[point], this.real[point + 1], this.real[point + 2], this.real[point + 3], this.real[point + 4], this.real[point + 5], this.real[point + 6], this.real[point + 7], this.real[point + 8]);
            }
            for (var column = 0; column < 9; column++) {
                this.columns[column] = new Column();
                var point = column;
                this.columns[column].setRow(this.real[point], this.real[point + 9], this.real[point + 9 * 2], this.real[point + 9 * 3], this.real[point + 9 * 4], this.real[point + 9 * 5], this.real[point + 9 * 6], this.real[point + 9 * 7], this.real[point + 9 * 8]);
            }
            for (var caste = 0; caste < 9; caste++) {
                for (var rowX = 0; rowX < 9; rowX++) {
                    var point = caste * 9 + rowX;
                    var casteData = indexToCasteData(point);
                    if (!this.castes[casteData.boxArrayIndex]) {
                        this.castes[casteData.boxArrayIndex] = new Caste();
                    }
                    this.castes[casteData.boxArrayIndex].set(casteData.boxIndex, this.real[point]);
                }
            }
        };
        return Table;
    }());

    var Backtrack = (function () {
        function Backtrack() {
        }
        Backtrack.full = function (table, algorithm) {
            var data = [];
            for (var row = 0; row < 9; row++) {
                for (var index = 0; index < 9; index++) {
                    if (table.rows[row].get(index).isEmpty()) {
                        data.push(rowToIndexData(row, index));
                    }
                }
            }
            return algorithm(table, data);
        };
        Backtrack.SolveCheck = function (table, perspectiveData) {
            var e_1, _a;
            var solveReturn = Backtrack.SolveIteration(table, perspectiveData);
            try {
                for (var perspectiveData_1 = __values(perspectiveData), perspectiveData_1_1 = perspectiveData_1.next(); !perspectiveData_1_1.done; perspectiveData_1_1 = perspectiveData_1.next()) {
                    var data = perspectiveData_1_1.value;
                    table.real[data.index].set(0);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (perspectiveData_1_1 && !perspectiveData_1_1.done && (_a = perspectiveData_1.return)) _a.call(perspectiveData_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return !solveReturn.double && solveReturn.valid;
        };
        Backtrack.SolveIteration = function (table, perspectiveData) {
            var index = perspectiveData[0].index;
            var rowInfo = indexToRowData(index);
            var columnInfo = indexToColumnData(index);
            var casteInfo = indexToCasteData(index);
            var solveReturn = {
                valid: false,
                double: false
            };
            var num = 1;
            var old = table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).get();
            while (true) {
                if (table.rows[rowInfo.boxArrayIndex].valid(num)) {
                    if (table.columns[columnInfo.boxArrayIndex].valid(num)) {
                        if (table.castes[casteInfo.boxArrayIndex].valid(num)) {
                            if (!solveReturn.valid) {
                                table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(num);
                                if (perspectiveData.length > 1) {
                                    var childSr = Backtrack.SolveIteration(table, perspectiveData.slice(1));
                                    solveReturn.valid = childSr.valid;
                                    if (childSr.double) {
                                        solveReturn.double = true;
                                        return solveReturn;
                                    }
                                }
                                else {
                                    solveReturn.valid = true;
                                }
                                table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(old);
                            }
                            else {
                                var childSr = Backtrack.SolveIteration(table, perspectiveData.slice(1));
                                if (childSr.double || childSr.valid) {
                                    solveReturn.double = true;
                                    return solveReturn;
                                }
                            }
                        }
                    }
                }
                if (num < 9) {
                    ++num;
                }
                else {
                    return solveReturn;
                }
            }
        };
        Backtrack.Generation = function (table, perspectiveData) {
            var index = perspectiveData[0].index;
            var rowInfo = indexToRowData(index);
            var columnInfo = indexToColumnData(index);
            var casteInfo = indexToCasteData(index);
            var valid = false;
            var num = Math.round(Math.random() * 8) + 1;
            var started = num;
            var firstIteration = true;
            while (!valid) {
                if (table.rows[rowInfo.boxArrayIndex].valid(num)) {
                    if (table.columns[columnInfo.boxArrayIndex].valid(num)) {
                        if (table.castes[casteInfo.boxArrayIndex].valid(num)) {
                            table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(num);
                            if (perspectiveData.length > 1) {
                                valid = Backtrack.Generation(table, perspectiveData.slice(1));
                            }
                            else {
                                valid = true;
                            }
                        }
                    }
                }
                if (!valid) {
                    if (num < 9 && (num !== started || firstIteration)) {
                        ++num;
                    }
                    else if (num === started && !firstIteration) {
                        table.rows[rowInfo.boxArrayIndex].get(rowInfo.boxIndex).set(0);
                        return false;
                    }
                    else {
                        num = 1;
                    }
                    firstIteration = false;
                }
            }
            return valid;
        };
        return Backtrack;
    }());

    var Erase = (function () {
        function Erase() {
        }
        Erase.EraseRandomIteration = function (table) {
            for (var i = 0; i < 81; i++) {
                var erase = Math.round(Math.random() * 1);
                if (erase) {
                    var char = table.real[i].get();
                    table.real[i].set(0);
                    if (!Backtrack.full(table, Backtrack.SolveCheck)) {
                        table.real[i].set(char);
                    }
                }
            }
        };
        Erase.EraseEveryIteration = function (table) {
            for (var i = 0; i < 81; i++) {
                var char = table.real[i].get();
                table.real[i].set(0);
                if (!Backtrack.full(table, Backtrack.SolveCheck)) {
                    table.real[i].set(char);
                }
            }
        };
        Erase.createHardFillable = function (table) {
            this.EraseRandomIteration(table);
            this.EraseEveryIteration(table);
            return true;
        };
        Erase.createFillable = function (table, iterations, timeout, variance) {
            if (timeout === void 0) { timeout = 10; }
            var count = 0;
            var failed = 0;
            var alreadyUsed = new Set();
            while (count < iterations) {
                var random = Math.round(Math.random() * 80);
                var upOrDown = Math.round(Math.random() * 1);
                while (alreadyUsed.has(random) && alreadyUsed.size < 81) {
                    if (upOrDown) {
                        if (random < 80) {
                            random++;
                        }
                        else {
                            random = 0;
                        }
                    }
                    else {
                        if (random > 0) {
                            random--;
                        }
                        else {
                            random = 80;
                        }
                    }
                }
                alreadyUsed.add(random);
                if (!table.real[random].isEmpty()) {
                    var value = table.real[random].get();
                    table.real[random].set(0);
                    if (!Backtrack.full(table, Backtrack.SolveCheck)) {
                        table.real[random].set(value);
                        ++failed;
                        if (failed === timeout) {
                            return false;
                        }
                    }
                    else {
                        failed = 0;
                        count++;
                    }
                }
            }
            return true;
        };
        Erase.HARDEST = 81;
        Erase.MIDDLE = 50;
        Erase.EASY = 25;
        Erase.Mode = {
            HARDEST: 64,
            MIDDLE: 50,
            EASY: 35
        };
        Erase.Checkover = {
            CLEAN: 40,
            NORMAL: 20,
            FAST: 5
        };
        return Erase;
    }());

    var Sudoku = (function () {
        function Sudoku() {
        }
        Sudoku.Value = Value;
        Sudoku.Box = Box;
        Sudoku.Row = Row;
        Sudoku.Column = Column;
        Sudoku.Caste = Caste;
        Sudoku.Perspective = Perspective;
        Sudoku.Table = Table;
        Sudoku.Backtrack = Backtrack;
        Sudoku.Erase = Erase;
        Sudoku.Util = {
            indexToCasteData: indexToCasteData,
            casteToIndexData: casteToIndexData,
            indexToRowData: indexToRowData,
            rowToIndexData: rowToIndexData,
            indexToColumnData: indexToColumnData,
            columnToIndexData: columnToIndexData
        };
        return Sudoku;
    }());

    return Sudoku;

})));
