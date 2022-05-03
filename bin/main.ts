#!/usr/bin/env node

import { Command } from 'commander';

import { init } from '@/lib/init';
import checkVersion from '../lib/check-version';

import { version } from '../package.json';

const program = new Command();

async function main() {
  init();

  await checkVersion();

  program
    .name('scaffold')
    .version(version)
    .command('list [local]', 'show all templates')
    .command('use <template>', 'Use a local template')
    .command('create [pathname]', 'create a local template from <pathname>')
    .parse(process.argv);
}

main();
