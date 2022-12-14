import _ from "lodash"
import { inspect } from "util"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n', '']) as string[][]

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
]

interface connectivityGraphType {
  [name: number]: { [name: number]: number[][] }
}

const buildConnectivityGraph = (input: string[][], compareFunction: Function) => {
  const conectivityGraph = {} as connectivityGraphType

  for (let y = 0; y < input.length; y++) {
    conectivityGraph[y] = {}
    for (let x = 0; x < input[0].length; x++) {
      conectivityGraph[y][x] = []
      for (let direction of directions) {
        let x2 = x + direction[0]
        let y2 = y + direction[1]
        if (x2 < 0 || y2 < 0 || x2 >= input[0].length || y2 >= input.length)
          continue
        if (compareFunction(input[y][x].charCodeAt(0), input[y2][x2].charCodeAt(0))) {
          conectivityGraph[y][x].push([x2,y2])
        }
      }
    }
  }
  return conectivityGraph
}

const dijkstra = (graph: string[][], connectivityGraph: connectivityGraphType, start: number[]) => {
  let meta = {} as { [name: number]: { [name: number]: { dist: number, prev: number[] | undefined } } }
  let queue = []

  for (let y = 0; y < graph.length; y++) {
    meta[y] = {}
    for (let x = 0; x < graph[0].length; x++) {
      meta[y][x] = { dist: 99999, prev: undefined }
      queue.push([x,y])
    }
  }
  meta[start[1]][start[0]].dist = 0

  while (queue.length != 0) {
    queue.sort((a,b) => meta[a[1]][a[0]].dist -  meta[b[1]][b[0]].dist)
    let u = queue.shift() as number[]

    for (let neighbor of connectivityGraph[u[1]][u[0]]) {
      // if (queue.findIndex((item) => neighbor[0] === item[0] && neighbor[1] === item[1]) == -1) {continue}
      let alt = meta[u[1]][u[0]].dist + 1
      if (alt < meta[neighbor[1]][neighbor[0]].dist) {
        meta[neighbor[1]][neighbor[0]] = {
          dist: alt,
          prev: u
        }
      }
    }
  }
  return meta
}

export function part1(rawinput: string) {
  const input = parse(rawinput)
  let start: number[] = [], end: number[] = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] == 'S') {
        start = [x, y]
        input[y][x] = 'a'
      }
      if (input[y][x] == 'E') {
        end = [x, y]
        input[y][x] = 'z'
      }
    }
  }

  const conectivityGraph = buildConnectivityGraph(input, (a: number, b: number) => a + 1 >= b)
  const result = dijkstra(input, conectivityGraph, start)

  return result[end[1]][end[0]].dist
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let starts: number[][] = []
  let end: number[] = []

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] == 'a' || input[y][x] == 'S') {
        starts.push([x, y])
        input[y][x] = 'a'
      }
      if (input[y][x] == 'E') {
        end = [x, y]
        input[y][x] = 'z'
      }
    }
  }

  const conectivityGraph = buildConnectivityGraph(input, (a: number, b: number) => b + 1 >= a)
  // console.log(inspect(conectivityGraph, true, null, true))
  const result = dijkstra(input, conectivityGraph, end)
  // console.log(inspect(result, true, null, true))

  let max = Infinity
  for (let start of starts) {
    if (result[start[1]][start[0]].dist < max) {
      max = result[start[1]][start[0]].dist
    }
  }
  return max
}