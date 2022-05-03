#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer'
import chalk from 'chalk';
import { Command } from 'commander';
import { checkPathValidFile, checkPathValidDirectory } from '@/lib/check-path-valid';
import { writeZipFile } from '@/lib/file-operate';

const program = new Command();

const templateZipDir = path.resolve(__dirname, '../templates/zip');

const promptList = [{
  type: "confirm",
  message: "Whether to overwrite existing files?",
  name: "shouldOverwrite",
}];

program.name('create')
  .addArgument(program.createArgument('-p --pathname', 'create a local template from <pathname>'))
  .action(async (pathname) => {

    const absPathname: string = path.isAbsolute(pathname) ? pathname : path.resolve(__dirname, pathname);

    const templateName = path.posix.basename(absPathname);

    if (checkPathValidDirectory(absPathname)) {

      const targetPathname = path.join(templateZipDir, templateName + '.zip');

      /* Case when the file was existed already*/
      if (checkPathValidFile(targetPathname)) {
        const answers = await inquirer.prompt(promptList);
        const { shouldOverwrite } = answers;
        if (!shouldOverwrite) {
          return;
        }
      }

      writeZipFile(absPathname, targetPathname);
      console.log(chalk.blue(`Template ${templateName} was created successfully!`));

    } else {

      console.error(chalk.red(`${pathname} is not a directory`));

    }

  })
  .parse(process.argv);

