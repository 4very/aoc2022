import _ from "lodash"
import { split } from "../helpers/io"

const parse = (input: string) => split(input, ['\n',''], val => parseInt(val, 10)) as number[][]
const visible = (forest: number[][], coords: number[]) => {
  const treeHeight = forest[coords[1]][coords[0]]
  const directions = [[1,0], [-1,0], [0,1], [0,-1]]
  for (const direction of directions) {
    let tallest = true
    for (let coordsCheck = [coords[0]+direction[0], coords[1]+direction[1]]; 
      coordsCheck[0] >= 0 && coordsCheck[0] < forest[0].length && 
      coordsCheck[1] >= 0 && coordsCheck[1] < forest.length;
      coordsCheck = [coordsCheck[0]+direction[0], coordsCheck[1]+direction[1]]) {
      
      tallest = treeHeight > forest[coordsCheck[1]][coordsCheck[0]]
      if (!tallest) {
        break
      }
    } 
    if (tallest) return true
  }
  return false
}

const scenicScore = (forest: number[][], coords: number[]): number => {
  const treeHeight = forest[coords[1]][coords[0]]
  const directions = [[1,0], [-1,0], [0,1], [0,-1]]

  let scores = _.fill(Array(4), 0)

  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i]

    for (let coordsCheck = [coords[0]+direction[0], coords[1]+direction[1]]; 
      coordsCheck[0] >= 0 && coordsCheck[0] < forest[0].length && 
      coordsCheck[1] >= 0 && coordsCheck[1] < forest.length;
      coordsCheck = [coordsCheck[0]+direction[0], coordsCheck[1]+direction[1]]) {

      scores[i]++

      if (treeHeight <= forest[coordsCheck[1]][coordsCheck[0]]) 
        break
    }
  }
  return scores.reduce((a,b) => a*b)
}

export function part1(rawinput: string) {
  const input = parse(rawinput)

  let count = 0

  for (let y = 0; y < input.length; y++ ){
    for (let x = 0; x < input[y].length; x++) {
      if (visible(input, [x,y])){
        count++
      }

    }
  }

  return count
}

export function part2(rawinput: string) {
  const input = parse(rawinput)

  let score = 0

  for (let y = 0; y < input.length; y++ ){
    for (let x = 0; x < input[y].length; x++) {
      score = Math.max(score, scenicScore(input, [x,y]))
    }
  }
  return score
}