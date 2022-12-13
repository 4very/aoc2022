import { split } from '../helpers/io'

const parse = (input: string) => {
  const sections = split(input, ['\n\n']) as string[]
  const setup = split(sections[0], '\n', (row) => {
    return row.match(new RegExp(`${'[ \\[]([ \\w])[ \\]] '.repeat((row.length + 1) / 4)}?`, 'i'))
      ?.slice(1)
  }).slice(0, -1) as string[][]

  const stacks: string[][] = []
  for (let i = 0; i < setup.length + 1; i++) {
    const temp: string[] = []
    setup.forEach((row: string[]) => temp.push(row[i]))
    stacks.push(temp.filter(val => val !== ' '))
  }

  const movements = split(sections[1], '\n', (command) => {
    return command.match(/move (\d+) from (\d+) to (\d+)\n?/)
      ?.slice(1)
      .map((a) => { return parseInt(a, 10) })
  })

  return { stacks, movements }

}

export function part1(rawinput: string) {
  const { stacks, movements } = parse(rawinput)

  movements.forEach((element: number[]) => {
    const number = element[0]
    const fromBox = element[1] - 1
    const destBox = element[2] - 1

    for (let i = 0; i < number; i++) {
      const movedBox = stacks[fromBox].shift() as string
      stacks[destBox].unshift(movedBox)
    }

  })

  return stacks.map(row => { return row[0] }).join('')
}

export function part2(rawinput: string) {
  const { stacks, movements } = parse(rawinput)

  movements.forEach((element: number[]) => {
    const number = element[0]
    const fromBox = element[1] - 1
    const destBox = element[2] - 1
  
    const movedBox = stacks[fromBox].splice(0, number) as string[]
    stacks[destBox].unshift(...movedBox)
  })  

  return stacks.map(row => { return row[0] }).join('')
}
