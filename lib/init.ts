import fs from 'fs';
import path from 'path';

export const templateDir = path.resolve(__dirname, '../templates');
export const templateZipDir = path.resolve(__dirname, '../templates/zip');
export const templatePackagesDir = path.resolve(__dirname, '../templates/packages');

export function init() {
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateZipDir);
    fs.mkdirSync(templatePackagesDir);
  }
}
