#!/usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Command } from 'commander';
import { checkPathValidFile, checkPathValidDirectory } from '@/lib/check-path-valid';
import { writeZipFile } from '@/lib/file-operate';
import { templateZipDir } from '@/lib/init';
import { overwritePromptList } from '@/lib/inquirer-config';
import logSymbols from 'log-symbols';

const program = new Command();

program
  .name('create')
  .addArgument(program.createArgument('<pathname>', 'create a local template from <pathname>'))
  .action(async (pathname) => {
    const absPathname: string = path.isAbsolute(pathname) ? pathname : path.resolve(__dirname, pathname);

    const templateName = path.posix.basename(absPathname);

    if (checkPathValidDirectory(absPathname)) {
      const targetPathname = path.join(templateZipDir, templateName + '.zip');

      /* Case when the file was existed already */
      if (checkPathValidFile(targetPathname)) {
        const answers = await inquirer.prompt(overwritePromptList);
        const { shouldOverwrite } = answers;
        if (!shouldOverwrite) {
          return;
        }
      }

      writeZipFile(absPathname, targetPathname);
      console.log(logSymbols.success, chalk.blue(`Template ${templateName} was created successfully!`));
    } else {
      console.error(chalk.red(`${pathname} is not a directory`));
    }
  })
  .parse(process.argv);
