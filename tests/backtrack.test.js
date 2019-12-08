const Sudoku = require("../build/sudoku");

const table = new Sudoku.Table();
let fullTable;

test("sudoku generation", () => {
    Sudoku.Backtrack.full(table, Sudoku.Backtrack.Generation);
    fullTable = new Sudoku.Table(table);
});

test("sudoku erase", function() {
    Sudoku.Erase.createFillable(table, Sudoku.Erase.Mode.HARDEST, Sudoku.Erase.Checkover.CLEAN);
    expect(table).not.toStrictEqual(fullTable);
});