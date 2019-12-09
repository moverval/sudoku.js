import Row from "./row";
import Column from "./column";
import Caste from "./caste";
import Generator from "./generator";
import Box from "./box";
export declare type RealTable = Box[];
export default class Table {
    rows: Row[];
    columns: Column[];
    castes: Caste[];
    real: Box[];
    generator: Generator;
    constructor(table: Table);
    generate(): void;
}
