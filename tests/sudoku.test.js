const Sudoku = require("../build/sudoku");

const table = new Sudoku.Table();

test("table existence", () => {
    expect(table).not.toBe(null);
    expect(table.real).not.toBe(null);
    expect(table.rows).toEqual(expect.arrayContaining([]));
    expect(table.columns).toEqual(expect.arrayContaining([]));
    expect(table.castes).toEqual(expect.arrayContaining([]));
});