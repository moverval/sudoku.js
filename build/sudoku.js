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
        return Value;
    }());

    var Box = (function () {
        function Box(value) {
            this.value = value;
        }
        Box.prototype.get = function () {
            return this.value.get();
        };
        Box.prototype.set = function (value) {
            this.value.set(value);
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

    var Perspective = (function () {
        function Perspective() {
            this.queue = [];
            this.numbersUsed = [false, false, false, false, false, false, false, false, false];
            this.fieldsUsed = [false, false, false, false, false, false, false, false, false];
        }
        Perspective.prototype.set = function (value, box) {
            this.queue[value] = box;
        };
        Perspective.prototype.has = function (value) {
            return this.queue[value] != null;
        };
        Perspective.prototype.get = function (value) {
            return this.queue[value];
        };
        Perspective.prototype.fillRandom = function () {
            var exit = false;
            var count = 0;
            while (exit) {
                var box = this.queue[count];
                var random = Math.round(Math.random() * 9);
                if (!this.numbersUsed[random]) {
                    box.set(random);
                    if (count === this.queue.length) {
                        exit = true;
                    }
                    count++;
                }
            }
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

    var Sudoku = (function () {
        function Sudoku() {
        }
        Sudoku.Value = Value;
        Sudoku.Box = Box;
        Sudoku.Row = Row;
        Sudoku.Column = Column;
        Sudoku.Caste = Caste;
        Sudoku.Perspective = Perspective;
        return Sudoku;
    }());

    return Sudoku;

})));
