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
    static Value: typeof Value;
    static Box: typeof Box;
    static Row: typeof Row;
    static Column: typeof Column;
    static Caste: typeof Caste;
    static Perspective: typeof Perspective;
    static Table: typeof Table;
    static Backtrack: typeof Backtrack;
    static Erase: typeof Erase;
    static Util: {
        indexToCasteData: typeof indexToCasteData;
        casteToIndexData: typeof casteToIndexData;
        indexToRowData: typeof indexToRowData;
        rowToIndexData: typeof rowToIndexData;
        indexToColumnData: typeof indexToColumnData;
        columnToIndexData: typeof columnToIndexData;
    };
}
