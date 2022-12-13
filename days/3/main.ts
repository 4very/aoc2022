import { split } from '../helpers/io'

const parse = (input: string) => split(input, ['\n', '']) as string[][]

const score = (item: string) => {
  const numberScore = item.charCodeAt(0)
  return numberScore - (numberScore > 95 ? 96 : 38)
}

export function part1(rawinput: string) {
  const input = parse(rawinput)

  let count = 0
  input.forEach((bag: string[]) => {
    count += score(bag.slice(0, bag.length / 2).filter(value => bag.slice(bag.length / 2, bag.length).includes(value))[0])
  })
  return count
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let count = 0
  for (let i = 0; i < input.length; i += 3) {
    count += score(input[i].filter(value => input[i + 1].includes(value)).filter(value => input[i + 2].includes(value))[0])
  }
  return count
}