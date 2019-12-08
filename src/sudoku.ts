import Value from "./components/value";
import Box from "./components/box";
import Row from "./components/row";
import Column from "./components/column";
import Caste from "./components/caste";
import Perspective from "./components/perspective";
import Table from "./components/table";
import { indexToCasteData, casteToIndexData, indexToRowData, rowToIndexData, indexToColumnData, columnToIndexData } from "./components/util";
import Backtrack from "./components/backtrack";
import Erase from "./components/erase";

export default class Sudoku {
    static Value: typeof Value = Value;
    static Box: typeof Box = Box;
    static Row: typeof Row = Row;
    static Column: typeof Column = Column;
    static Caste: typeof Caste = Caste;
    static Perspective: typeof Perspective = Perspective;
    static Table: typeof Table = Table;
    static Backtrack: typeof Backtrack = Backtrack;
    static Erase: typeof Erase = Erase;
    static Util = {
        indexToCasteData,
        casteToIndexData,
        indexToRowData,
        rowToIndexData,
        indexToColumnData,
        columnToIndexData
    };
}