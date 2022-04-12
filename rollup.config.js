import ts from 'rollup-plugin-ts';
import {defineConfig} from "rollup";

export default defineConfig({
    input:'./src/index.ts',
    output:{
        file:'./lib/index.js',
        format:'commonjs',
    },
    plugins:[
        ts({
            tsconfig:'tsconfig.json',
        })
    ]
})