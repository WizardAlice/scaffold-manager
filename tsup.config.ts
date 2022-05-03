import fs from "fs";
import path from "path";
import tsup from 'tsup';

const { defineConfig } = tsup;

const dirname = path.resolve(__dirname, 'bin');

const files: string[] = [];

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

export default defineConfig({
  entry: files,
  clean: true,
  dts: true,
  outDir: "dist",
  format: ['cjs', 'esm'],
  external: []
});
