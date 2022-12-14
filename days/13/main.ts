import _ from "lodash"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n\n','\n'], (val) => JSON.parse(val)) as RecursiveArray[][]
type RecursiveArray = Array<RecursiveArray | number>;

const check = (left: RecursiveArray, right: RecursiveArray) => {
  
}

export function part1(rawinput: string) {
  const input = parse(rawinput)
  console.log(input)

  let result = []

  for (let pair of input) {
    let left = pair[0]
    let right = pair[1]
    let i = 0



  }

  return 
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  return 
}