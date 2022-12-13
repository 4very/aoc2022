
import { readFileSync } from 'fs'
import { resolve } from 'path'

export function readInput(dir: string, filename: string): string {
  return readFileSync(resolve(dir, filename)).toString()
}

export function split(input: any, delimiters: string | string[], func: { (a: string): any } = (a: string) => { return a }, removeBlanks = true): any {
  if (input instanceof Array) {
    return input.map((e) => { return split(e, delimiters, func) })
  }
  if (delimiters.length == 0) {
    return func(input)
  }
  if (typeof input === 'string') {
    return split(removeBlanks ? input.split(delimiters[0]).filter(itm => itm !== '') : input.split(delimiters[0]), delimiters.slice(1), func)
  }

  return []
}