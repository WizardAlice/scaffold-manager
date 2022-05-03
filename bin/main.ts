#!/usr/bin/env node

import { Command } from 'commander';

import checkVersion from '../lib/check-version';

import { version } from '../package.json';

const program = new Command();

async function main() {

  await checkVersion()

  program
    .name('scaffold')
    .version(version)
    .command('list [local]', 'show all templates')
    .command('download [templateName]', 'download builtin template from remote')
    .command('create', 'create a local template from <pathname>')
    .parse(process.argv);
}

main();
