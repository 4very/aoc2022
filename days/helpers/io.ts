
import { readFileSync } from 'fs'
import { resolve } from 'path'

export function readInput(dir: string, real = false): string {
  return readFileSync(resolve(dir, real ? 'input.txt' : 'sample.txt')).toString()
}

export function split(input: any, delimiters: string | string[]): any {
    if (typeof input === 'string' && typeof delimiters === 'string') {
      return input.split(delimiters)
    }
    if (typeof input === 'string' && delimiters instanceof Array) {
      return split(input.split(delimiters[0]), delimiters.length === 2 ? delimiters[1] : delimiters.slice(1))
    }
    if (input instanceof Array) {
      return input.map((e) => { return split(e, delimiters)})
    }
  return []
}