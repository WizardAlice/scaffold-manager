import ora from 'ora';
import chalk from 'chalk';
import AdmZip from 'adm-zip';

export function zipFolder(sourceFolder: string, destZip: string) {
  var zip = new AdmZip();
  zip.addLocalFolder(sourceFolder);
  zip.writeZip(destZip);
}

export function writeZipFile(from: string, to: string) {
  const spinner = ora(chalk.green(`Copying template from ${from} to ${to}`)).start();
  console.log()
  zipFolder(from, to);
  spinner.stop();
}
