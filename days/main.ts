
import minimist from 'minimist'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import { readInput } from './helpers/io'
import { runWithTime } from './helpers/run'

const argv = minimist(process.argv.slice(2))

if (!('d' in argv || 'day' in argv)) argv.d = [1, 2, 3, 4, 5, 6]
const days = ((typeof argv.d == 'number') ? [argv.d] : argv.d)
  .concat((typeof argv.day == 'number') ? [argv.day] : argv.day)
  .filter(Number)

const rundata: {[name: number]: {[name: string]: {[name: string]: {time: number, result: string | number}}}} = {}

for (const day of days) {
  console.log(`--- day ${day} ---`)
  const folder = resolve(dirname(fileURLToPath(import.meta.url)), `${day}`)
  const functions = await import(folder + '/main.ts')
  rundata[day] = {
    'part1': {},
  }

  const files = []
  if ('s' in argv || 'sample' in argv) {
    files.push('sample.txt')
  }
  if ('i' in argv || 'input' in argv) {
    files.push('input.txt')
  }
  if ('file' in argv) {
    if (typeof argv.file == 'string') {
      files.push(argv.file)
    } else {
      files.concat(argv.file)
    }
  }

  for (const file of files) {
    const input = readInput(folder, file)
    console.log(file)

    const p1result = runWithTime(functions.part1, input)
    console.log(`\tPart 1: "${p1result.result}" in ${p1result.time.toFixed(3)}ms`)

    const p2result = runWithTime(functions.part2, input)
    console.log(`\tPart 2: "${p2result.result}" in ${p2result.time.toFixed(3)}ms`)

    rundata[day][file] = {
      'part1': p1result,
      'part2': p2result,
    }
  }
  console.log('')
}




