import Value from "./compenents/value";
import Box from "./compenents/box";
import Row from "./compenents/row";
import Column from "./compenents/column";
import Caste from "./compenents/caste";
import Perspective from "./compenents/perspective";

export default class Sudoku {
    static Value: typeof Value = Value;
    static Box: typeof Box = Box;
    static Row: typeof Row = Row;
    static Column: typeof Column = Column;
    static Caste: typeof Caste = Caste;
    static Perspective: typeof Perspective = Perspective;
}