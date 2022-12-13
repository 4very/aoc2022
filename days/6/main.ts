import { split } from '../helpers/io'

const parse = (input: string) => split(input, ['']) as string[]

const bruteForce = (input: string[], size: number) => {
  const checkArray = (array: string[]) => {
    return (new Set(array)).size !== array.length
  }

  const buffer = input.slice(0, size)
  for (let i = size - 1; i < input.length; i++) {
    if (!checkArray(buffer))
      return i

    buffer.splice(0, 1)
    buffer.push(input[i])
  }
}

const optimized = (input: string[], SIZE: number) => {
  const addedCharUnique = (addedChar: string, array: string[]) => {
    for (const char of array) {
      if (addedChar === char) return false
    }
    return true
  }

  const buffer2 = input.slice(0, SIZE - 1)
  // create a list of all of the duplicates in the start buffer
  const waitChars = [...buffer2].filter((itm: string, index: number) => buffer2.indexOf(itm) !== index ?? itm) as string[]

  for (let i = SIZE - 1; i < input.length; i++) {
    const charUnique = addedCharUnique(input[i], buffer2)

    // if the added char doesnt exist in the buffer and if we arent waiting for any duplicates come out
    if (charUnique && waitChars.length == 0) {
      return i+1
    }
    const removedChar = buffer2.splice(0, 1)[0]
    buffer2.push(input[i])

    if (!charUnique) {
      waitChars.push(input[i])
    }

    const loc = waitChars.indexOf(removedChar)
    if (loc !== -1) {
      waitChars.splice(loc, 1)
    }
  }

}

export function part1(rawinput: string) {
  const input = parse(rawinput)
  return bruteForce(input, 4)
}

export function part2(rawinput: string) {
  const input = parse(rawinput)
  return optimized(input, 14)
}