
import { readFileSync } from 'fs'
import { resolve } from 'path'
export function readSample() {
  readFileSync(resolve(__dirname, 'sample.txt'))
}