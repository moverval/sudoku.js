import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: "./src/sudoku.ts",
        output: [
            {
                name: "Sudoku",
                file: "build/sudoku.js",
                format: "umd"
            }
        ],
        plugins: [
            typescript()
        ]
    },
    {
        input: "./src/sudoku.ts",
        output: [
            {
                name: "Sudoku",
                file: "build/sudoku.min.js",
                format: "umd"
            }
        ],
        plugins: [
            typescript(),
            terser({
                output: {
                    comments: false,
                    semicolons: false
                }
            })
        ]
    }
];