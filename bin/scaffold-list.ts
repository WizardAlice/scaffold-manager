#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { Command } from 'commander';
import { templateDir } from '@/lib/init';
import { checkPathValidDirectory } from '@/lib/check-path-valid';

const program = new Command();

program
  .name('list')
  .action((local) => {
    if (local) {
      if (!fs.existsSync(templateDir)) {
        fs.mkdirSync(templateDir);
      }

      if (checkPathValidDirectory(templateDir)) {
        console.log(logSymbols.info, 'Local template:');

        const zipPathname = path.resolve(templateDir, 'zip');

        fs.readdirSync(zipPathname).forEach((file) => {
          const filename = file.replace(/\.zip$/, '');

          console.log(chalk.bgWhite.black(filename));
        });
      } else {
        console.error(chalk.red(`${templateDir} is not a directory`));
      }
    }
  })
  .parse(process.argv);
