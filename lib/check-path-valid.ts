import fs from 'fs';
import path from 'path';

export function checkPathValidDirectory(pathname: string): boolean {
  return fs.statSync(pathname).isDirectory();
}

export function checkPathValidFile(pathname: string): boolean {
  return fs.statSync(pathname).isFile();
}
