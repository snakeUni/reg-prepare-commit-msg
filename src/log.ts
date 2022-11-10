/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import baseDebug from 'debug';

const de = baseDebug('prepare-commit-msg');

const verbose = process.argv.find((arg) => arg === '--verbose');

export function debug(message: string): void {
  if (!verbose) {
    return;
  }
  de(message);
}

export function log(message: string): void {
  de(`prepare commit msg > ${message}`);
}

export function logger(message: string): void {
  console.log(`prepare commit msg > ${message}`);
}

export function error(err: string): void {
  console.error(`prepare commit msg > ${err}`);
}
