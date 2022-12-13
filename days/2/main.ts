import { split } from '../helpers/io'

const parse = (input: string) => {
  return split(input, ['\n', ' ']) as string[][]
}

const playScores: { [name: string]: number } = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

const cachedResults: { [name: string]: { [name: string ]: number}} = {
  'A': {
    'X': 3,
    'Y': 6,
    'Z': 0,
  },
  'B': {
    'X': 0,
    'Y': 3,
    'Z': 6,
  },
  'C': {
    'X': 6,
    'Y': 0,
    'Z': 3,
  },
}

const cachedResultsPart2: { [name: string]: { [name: string ]: number}} = {
  'A': {
    'X': 0 + 3,
    'Y': 3 + 1,
    'Z': 6 + 2,
  },
  'B': {
    'X': 0 + 1,
    'Y': 3 + 2,
    'Z': 6 + 3,
  },
  'C': {
    'X': 0 + 2,
    'Y': 3 + 3,
    'Z': 6 + 1,
  },
}


export function part1(rawinput: string) {
  const input = parse(rawinput)
  let score = 0

  input.forEach((round) => {
    score += playScores[round[1]]
    score += cachedResults[round[0]][round[1]]
  })
  return score
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let score = 0
  input.forEach((round) => {
    score += cachedResultsPart2[round[0]][round[1]]
  })
  return score
}