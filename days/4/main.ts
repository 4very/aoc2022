import { split } from '../helpers/io'

const parse = (input: string) => split(input, ['\n', ',', '-'], (a: string) => { return parseInt(a, 10)}) as number[][][]

export function part1(rawinput: string) {
  const input = parse(rawinput)
  return input.filter((pair) => {
    const checkRange = (inner: number[], outer: number[]) => { return inner[0] >= outer[0] && inner[1] <= outer[1] }
    return checkRange(pair[0], pair[1]) || checkRange(pair[1], pair[0])
  }).length
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  return input.filter((pair) => {
    const checkRange = (inner: number[], outer: number[]) => { return inner[0] >= outer[0] && inner[1] <= outer[1] }
    return checkRange(pair[0], pair[1]) || 
      checkRange(pair[1], pair[0]) || 
      (pair[0][0] <= pair[1][1] && pair[1][0] <= pair[0][1])
  
  }).length
}

