import { readInput, split } from '../helpers/io'

const input = split(readInput(__dirname, true), ['\n', '']) as string[][]

const score = (item: string) => {
  const numberScore = item.charCodeAt(0) 
    return numberScore - (numberScore > 95 ?  96 : 38)
}

let part1 = 0
input.forEach((bag: string[]) => {
  part1 += score(bag.slice(0, bag.length/2).filter(value => bag.slice(bag.length/2, bag.length).includes(value))[0])
})

console.log(part1)

let part2 = 0
for (let i = 0; i < input.length; i += 3) {
  part2 += score(input[i].filter(value => input[i+1].includes(value)).filter(value => input[i+2].includes(value))[0])

}

console.log(part2)