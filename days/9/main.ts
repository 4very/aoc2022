import _ from "lodash"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n', ' ']) as string[][]
const directions: { [name: string]: number[] } = {
  "R": [1, 0],
  "L": [-1, 0],
  "U": [0, 1],
  "D": [0, -1]
}

const increase = (elt: number[], direction: string, amount: number) => {
  elt = [elt[0] + (directions[direction][0] * amount),
  elt[1] + (directions[direction][1] * amount)]
  return elt
}

const moveTail = (head: number[], tail: number[]): number[] => {
  if (Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1)
    return tail

  if (head[1] !== tail[1])
    tail = [tail[0], tail[1] + (tail[1] > head[1] ? -1 : 1)]

  if (head[0] !== tail[0])
    tail = [tail[0] + (tail[0] > head[0] ? -1 : 1), tail[1]]



  return tail
}

const visualize = (head: number[], tail: number[]) => {
  process.stdout.write('\n')
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      if (x === head[0] && y === head[1]) process.stdout.write("H")
      else if (x === tail[0] && y === tail[1]) process.stdout.write("T")
      else process.stdout.write('.')
    }
    process.stdout.write('\n')
  }
  process.stdout.write(`H: ${head}, T: ${tail}\n`)
}

export function part1(rawinput: string): number {
  const input = parse(rawinput)

  let head = [0, 0]
  let tail = [0, 0]

  let tailLocations: Set<string> = new Set<string>()

  for (const command of input) {
    const amount = parseInt(command[1], 10)
    for (let i = 0; i < amount; i++) {
      head = increase(head, command[0], 1)
      tail = moveTail(head, tail)
      tailLocations.add(tail.join(':'))
    }
    // visualize(head, tail)
  }

  return tailLocations.size 
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let head = [0, 0]
  let rope = _.fill(Array(9), [0,0])

  let tailLocations: Set<string> = new Set<string>()

  for (const command of input) {
    const amount = parseInt(command[1], 10)
    for (let i = 0; i < amount; i++) {
      head = increase(head, command[0], 1)
      rope[0] = moveTail(head, rope[0])
      for (let i = 1; i < 9; i++) {
        rope[i] = moveTail(rope[i-1], rope[i])
      }
      tailLocations.add(rope[8].join(':'))
    }
    // visualize(head, tail)
  }

  return tailLocations.size 
}