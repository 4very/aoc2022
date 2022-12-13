import _ from "lodash"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n', ''], (letter) => letter === 'S' ? 'a' : letter === 'E' ? 'z' : letter) as string[][]

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
]

interface connectivityGraphType {
  [name: number]: { [name: number]: { [name: number]: { [name: number]: boolean } } }
}

const buildConnectivityGraph = (input: string[][]) => {
  const conectivityGraph = {} as connectivityGraphType

  for (let y = 0; y < input.length; y++) {
    conectivityGraph[y] = {}
    for (let x = 0; x < input[0].length; x++) {
      conectivityGraph[y][x] = {}
      for (let direction of directions) {
        let x2 = x + direction[0]
        let y2 = y + direction[1]
        if (x2 < 0 || y2 < 0 || x2 >= input[0].length || y2 >= input.length)
          continue
        conectivityGraph[y][x][y2] = {}
        conectivityGraph[y][x][y2][x2] = input[y][x].charCodeAt(0) + 1 >= input[y2][x2].charCodeAt(0)
      }
    }
  }
  return conectivityGraph
}

const dijkstra = (graph, connectivityGraph: connectivityGraphType) => {

}

export function part1(rawinput: string) {
  const input = parse(rawinput)
  const conectivityGraph = buildConnectivityGraph(input)
  console.log(conectivityGraph[0][0])

  return
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  return
}