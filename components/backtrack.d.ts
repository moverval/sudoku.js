import Table from "./table";
import { PerspectiveData } from "./util";
export declare type BacktrackAlgorithm = (table: Table, perspectiveData: PerspectiveData[]) => boolean;
interface SolveReturn {
    double: boolean;
    valid: boolean;
}
export default class Backtrack {
    static full(table: Table, algorithm: BacktrackAlgorithm): boolean;
    static SolveCheck(table: Table, perspectiveData: PerspectiveData[]): boolean;
    static SolveIteration(table: Table, perspectiveData: PerspectiveData[]): SolveReturn;
    static Generation(table: Table, perspectiveData: PerspectiveData[]): boolean;
}
export {};
