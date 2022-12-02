import { readInput, split } from '../helpers/io'

const input = split(readInput(__dirname), ['\n', ' ']) as string[][]

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

let part1Score = 0
input.forEach((round) => {
  part1Score += playScores[round[1]]
  part1Score += cachedResults[round[0]][round[1]]
})

console.log(part1Score)

// part 2

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

let part2Score = 0
input.forEach((round) => {
  part2Score += cachedResultsPart2[round[0]][round[1]]
})

console.log(part2Score)