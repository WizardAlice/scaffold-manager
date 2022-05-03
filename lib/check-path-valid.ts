/*
 * @Author: wangtong.wizard
 * @Date: 2022-05-03 20:57:35
 * @LastEditors: wangtong.wizard
 * @LastEditTime: 2022-05-04 00:33:58
 */
import fs from 'fs';

export function checkPathValidDirectory(pathname: string): boolean {
  if (!fs.existsSync(pathname)) {
    return false;
  }
  return fs.statSync(pathname).isDirectory();
}

export function checkPathValidFile(pathname: string): boolean {
  if (!fs.existsSync(pathname)) {
    return false;
  }
  return fs.statSync(pathname).isFile();
}
