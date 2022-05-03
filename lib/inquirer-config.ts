import fs from 'fs';
import path from 'path';
import { templateZipDir } from './init';

export function getSelectTemplateConfig() {
  const files: string[] = [];

  function travel(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const pathname = path.join(dir, file);
      if (fs.statSync(pathname).isFile()) {
        const filename = path.posix.basename(file).replace(/\.zip/, '');

        files.push(filename);
      }
    });
  }

  travel(templateZipDir);

  const templateSelectPromptList = [
    {
      type: 'list',
      message: 'select a template:',
      name: 'template',
      choices: files,
    },
  ];

  return templateSelectPromptList;
}

export const overwritePromptList = [
  {
    type: 'confirm',
    message: 'Whether to overwrite existing files?',
    name: 'shouldOverwrite',
  },
];

export function getDirnamePromptList(defaultName: string) {
  return [
    {
      type: 'input',
      message: 'Input your project name:',
      name: 'name',
      default: defaultName,
    },
  ];
}
