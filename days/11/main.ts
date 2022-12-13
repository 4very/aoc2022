import _ from "lodash"
import { split } from "../helpers/io"

const regexp = /Monkey (?<num>\d+):\n *Starting items: (?<items>.*)\n *Operation: new = (?<operation>.*)\n *Test: divisible by (?<testexp>\d+)\n *If true: throw to monkey (?<true>\d+)\n * If false: throw to monkey (?<false>\d+)/

interface monkey {
  num: number,
  items: number[],
  operation: Function,
  testNum: number,
  test: Function,
  outcomes: {
    0: number,
    1: number
  },
  inspectedCount: number
}



const parse = (input: string) => split(input, ['\n\n'], (monkey) => {
  const groups = monkey.match(regexp)?.groups
  if (!!groups)
    return {
      num: parseInt(groups.num, 10),
      items: groups.items.split(', ').map(item => parseInt(item, 10)),
      operation: (val: any) => eval(groups.operation.replaceAll('old', val)), 
      test: (val: any) => val % parseInt(groups.testexp,10) === 0,
      testNum: parseInt(groups.testexp,10),
      outcomes: {
        1: parseInt(groups.true, 10),
        0: parseInt(groups.false, 10)
      } as {[index: number]: number},
      inspectedCount: 0
    } 
}) as monkey[]

export function part1(rawinput: string) {
  const input = parse(rawinput)

  let currentMonkey = {} as monkey

  for (let i = 0; i < 20; i++) {
    for (let monkey in input) {
      // console.log(monkey)
      currentMonkey = input[monkey]
      for (let item of currentMonkey.items) {
        currentMonkey.inspectedCount++
        item = Math.floor(currentMonkey.operation(item)/3)
        // console.log('\t', item, currentMonkey.test(item), currentMonkey.outcomes)
        if (currentMonkey.test(item))
          input[currentMonkey.outcomes[1]].items.push(item)
        else 
          input[currentMonkey.outcomes[0]].items.push(item)
      } 
      input[monkey].items = []
    }

  }
  
  // input.forEach(element => {
  //   console.log(`${element.num}: ${element.items}`)
  // });

  const answer = input.map(itm => itm.inspectedCount).sort((a,b)=> a-b).slice(-2).reduce((a,b)=> a*b)

  return answer
}

interface itemsType {
  [name: number]: number
}
interface monkey2 {
  num: number,
  items: itemsType[],
  operation: Function,
  test: Function,
  testNum: number,
  outcomes: {
    0: number,
    1: number
  },
  inspectedCount: number
}

export function part2(rawinput: string) {
  const input = parse(rawinput)
  const operands = input.map(itm => itm.testNum)

  const newMonkeys: monkey2[] = []
  for (let monkey of input) {
    newMonkeys.push({
      ...monkey,
      items: monkey.items.map((rawitem) => {
        let item: itemsType = {}
        for (let operand of operands) {
          item[operand] = rawitem % operand
        } return item
      })
    })
  }
  // console.log(JSON.stringify(newMonkeys, undefined, " "))

  let currentMonkey = {} as monkey2

  for (let i = 0; i < 10000; i++) {
    for (let monkey in newMonkeys) {
      // console.log(monkey)
      currentMonkey = newMonkeys[monkey]
      for (let item of currentMonkey.items) {
        currentMonkey.inspectedCount++

        for (let operand of operands) {
          const calc = currentMonkey.operation(item[operand])
          item[operand] = calc % operand
        }
        
        // console.log('\t', item, currentMonkey.test(item), currentMonkey.outcomes)
        if (item[currentMonkey.testNum] === 0)
          newMonkeys[currentMonkey.outcomes[1]].items.push(item)
        else 
          newMonkeys[currentMonkey.outcomes[0]].items.push(item)
      } 
      newMonkeys[monkey].items = [] as itemsType[]
    }
  }

  const answer = newMonkeys.map(itm => itm.inspectedCount).sort((a,b)=> a-b).slice(-2).reduce((a,b)=> a*b)

  return answer
}