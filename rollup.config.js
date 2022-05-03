import fs from "fs";
import path from "path";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import {
  cleandir
} from "rollup-plugin-cleandir";

const dirname = path.resolve(__dirname, 'bin');

const files = [];

function travel(dir) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file)
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname)
    } else {
      files.push(path.relative(__dirname, pathname));
    }
  })
}

travel(dirname);

const config = [{
    input: files.map(filename => path.resolve('_tsc', filename.replace('.ts', '.js'))),
    output: [{
      dir: 'dist/cjs',
      format: 'cjs'
    }, {
      dir: 'dist/es',
      format: 'es'
    }],
    plugins: [
      cleandir("./dist"),
      json(),
      nodeResolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      }),
    ]
  },
  {
    input: [
      'bin/main.ts'
    ],
    output: [{
      file: "dist/index.d.ts",
      format: "es"
    }],
    plugins: [
      typescript(),
      dts(),
    ]
  }
];

export default config;
