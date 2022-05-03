#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { Command } from 'commander';

const program = new Command();

const templateDir = path.resolve(__dirname, '../templates');

program.name('list')
  .action((local) => {
    if (local) {
      if (fs.statSync(templateDir).isDirectory()) {
        console.log(logSymbols.info, 'Local template:');
        const zipPathname = path.resolve(templateDir, 'zip');
        console.log("🚀 ~ file: scaffold-list.ts ~ line 19 ~ .action ~ zipPathname", zipPathname)
        fs.readdirSync(zipPathname).forEach((file) => {
          console.log(chalk.blue(file));
        })
      } else {
        console.error(chalk.red(`${templateDir} is not a directory`));
      }
    }
  })
  .parse(process.argv);

