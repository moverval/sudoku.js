import Value from "./compenents/value";
import Box from "./compenents/box";
import Row from "./compenents/row";
import Column from "./compenents/column";
import Caste from "./compenents/caste";
import Perspective from "./compenents/perspective";
import Table from "./compenents/table";
import { indexToCasteData, casteToIndexData, indexToRowData, rowToIndexData, indexToColumnData, columnToIndexData } from "./compenents/util";

export default class Sudoku {
    static Value: typeof Value = Value;
    static Box: typeof Box = Box;
    static Row: typeof Row = Row;
    static Column: typeof Column = Column;
    static Caste: typeof Caste = Caste;
    static Perspective: typeof Perspective = Perspective;
    static Table: typeof Table = Table;
    static Util = {
        indexToCasteData,
        casteToIndexData,
        indexToRowData,
        rowToIndexData,
        indexToColumnData,
        columnToIndexData
    };
}