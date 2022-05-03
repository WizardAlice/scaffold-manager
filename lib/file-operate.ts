import ora from 'ora';
import chalk from 'chalk';
import iconv from 'iconv-lite';
import AdmZip from 'adm-zip';

export function unzip(from: string, to: string) {
  const zip = new AdmZip(from);

  const zipEntries = zip.getEntries();

  for (let i = 0; i < zipEntries.length; i++) {
    const entry = zipEntries[i];
    entry.entryName = iconv.decode(entry.rawEntryName, 'gbk');
  }

  zip.extractAllTo(to, true);
}

export function zipFolder(from: string, to: string) {
  const zip = new AdmZip();
  zip.addLocalFolder(from);
  zip.writeZip(to);
}

export function writeZipFile(from: string, to: string) {
  const spinner = ora(chalk.green(`Copying template from ${from} to ${to}`)).start();
  console.log();
  zipFolder(from, to);
  spinner.stop();
}
