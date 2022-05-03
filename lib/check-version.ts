import ora from 'ora';
import chalk from 'chalk';
import semver from 'semver';
import axios from 'axios';

import { name, version, publishConfig } from '../package.json';
import logSymbols from 'log-symbols';

export default function checkVersion(): Promise<boolean> {
  const spinner = ora(chalk.bold.green(`Start to check ${name} version`)).start();

  return axios({
    method: 'get',
    url: `${publishConfig.registry}${name}`,
    responseType: 'json',
  })
    .then(({ status, data }) => {
      spinner.stop();
      console.log();
      if (status !== 200) {
        throw new Error('failed to fetch remote version');
      }

      const latestVersion = data['dist-tags'].latest;

      if (semver.lt(version, latestVersion)) {
        console.log(
          chalk.red(`The local version is behind the remote, run "npm install ${name}@${latestVersion}" to update`)
        );
      }

      console.log(logSymbols.success, chalk.blue('You are using the latest version!'));
      console.log();

      return true;
    })
    .catch((e) => {
      spinner.fail();
      console.log(chalk.red('Check for updates failed'));
      console.error('Error message: ', chalk.red(e.message));
      return true;
    });
}
