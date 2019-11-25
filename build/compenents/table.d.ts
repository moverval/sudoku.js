import Row from "./row";
import Column from "./column";
import Caste from "./caste";
export interface TableOptions {
    generate: boolean;
    genAll: boolean;
}
export default class Table {
    rows: Row[];
    columns: Column[];
    castes: Caste[];
    constructor(options?: TableOptions);
    generate(): void;
}
