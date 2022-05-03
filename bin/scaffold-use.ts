#!/usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { Command } from 'commander';
import { checkPathValidFile, checkPathValidDirectory } from '@/lib/check-path-valid';
import { unzip } from '@/lib/file-operate';
import { templateZipDir } from '@/lib/init';
import { getDirnamePromptList, getSelectTemplateConfig, overwritePromptList } from '@/lib/inquirer-config';
import logSymbols from 'log-symbols';

const program = new Command();

program
  .name('use')
  .arguments('[template]')
  .action(async (template) => {
    if (template === undefined) {
      const answers = await inquirer.prompt(getSelectTemplateConfig());
      template = answers.template;
    }

    const absTemplatePathname: string = path.resolve(templateZipDir, template + '.zip');

    if (!checkPathValidFile(absTemplatePathname)) {
      const error = new Error(`Template ${template} not exist!`);
      console.error(chalk.red(error.message));
      throw error;
    }

    const answers = await inquirer.prompt(getDirnamePromptList(template));
    const { name } = answers;
    if (!name) {
      const error = new Error('Invalid name');
      console.error(chalk.red(error.message));
      throw error;
    }

    const targetPathname = path.resolve(process.cwd(), name);

    const targetDir = path.resolve(process.cwd(), name);

    if (checkPathValidDirectory(targetPathname)) {
      const answers = await inquirer.prompt(overwritePromptList);
      const { shouldOverwrite } = answers;
      if (!shouldOverwrite) {
        return;
      }
    }

    unzip(absTemplatePathname, targetDir);

    console.log(logSymbols.success, chalk.blue(`Project ${name} was created successfully!`));
  })
  .parse(process.argv);
