import _ from "lodash"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n', ' ']) as string[][]

const noop = () => null
const addx = (context: contextType) => context.registries.x = context.registries.x + parseInt(context.command[1])

const instructionData = {
  'noop': { cycles: 1, function: noop },
  'addx': { cycles: 2, function: addx },
} as { [name: string]: any }

interface contextType {
  command: string[],
  registries: {
    [name: string]: number
  }
}

export function part1(rawinput: string) {
  const input = parse(rawinput)

  let cycle = 1
  let instruction = 0
  let context = {
    command: [],
    registries: {
      x: 1
    }
  } as contextType
  let stack = { cycles: 0 } as { cycles: number, function: any }
  let answer = 0

  while (instruction < input.length || stack.cycles > 0) {

    if (stack.cycles <= 0) {
      context.command = input[instruction]
      stack = {...instructionData[context.command[0]]}
    }



    if ((cycle + 20) % 40 === 0) {
      console.log(cycle, context.registries.x)
      answer += cycle * context.registries.x
    }

    stack.cycles--
    if (stack.cycles <= 0) {
      stack.function(context)
      instruction++
    }

    cycle++
  }
  return answer
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let cycle = 1
  let instruction = 0
  let context = {
    command: [],
    registries: {
      x: 1
    }
  } as contextType
  let stack = { cycles: 0 } as { cycles: number, function: any }
  let answer = ''

  while (instruction < input.length || stack.cycles > 0) {

    if (stack.cycles <= 0) {
      context.command = input[instruction]
      stack = {...instructionData[context.command[0]]}
    }



    if ((cycle-1) % 40 === 0)
      answer += '\n'
    
    if (Math.abs(context.registries.x - (cycle-1)%40) > 1)
      answer += '.'
    else 
      answer += '#'

    stack.cycles--
    if (stack.cycles <= 0) {
      stack.function(context)
      instruction++
    }

    cycle++
  }
  return answer

}