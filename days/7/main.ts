import { split } from "../helpers/io"
import _ from 'lodash'


// const parse = (input: string) => split(split(input, ["$ "]).filter((item: string) => item !== ''), ['\n'])
// .map((elt: string[]) => elt.filter((item: string) => item !== ''))

const parse = (input: string) => split(input, ["$ ", '\n', ' '], undefined, true) as string[][][]


interface folder {
  [name: string]: folder | number
}

const folders = (obj: folder, path: string[], counts: {[name: string]: number}) => {

  const files = path.length === 0 ? obj : _.get(obj, path.join("."))
  for (const [key, val] of Object.entries(files)){
    if (typeof val === 'number') {
      counts.root += val
      for (let i = 0; i < path.length; i++) {
        const subpath = path.slice(0, i+1).join(".")
        subpath in counts ? counts[subpath] += val : counts[subpath] = val
      }
    } else {
      folders(obj, path.concat(key), counts)
    }
  }
}

const generateFileStructure = (input: string[][][]) => {
  let curdir: string[] = []
  let fileStructure: folder = {}

  for (let command of input) {
    const flat = command.flat()
    if (flat[0] === 'cd') {
      switch (flat[1]) {
        case '..':
          curdir.pop()
          break;
        case '':
        case '/':
          curdir = []
          break
        default:
          curdir.push(flat[1])
          break;
      } 
    }

    if (flat[0] === 'ls') {
      let dir = _.invert(_.fromPairs(_.chunk(flat.slice(1), 2)))
      const folderDir: folder = _.mapValues(dir, val => val === 'dir' ? {} as folder: parseInt(val, 10))

      curdir.length === 0 ? fileStructure = {...fileStructure, ...folderDir} : _.set(fileStructure, curdir.join('.'), {...(_.get(fileStructure, curdir.join(".")) as folder), ...folderDir})
    }

  }

  return fileStructure
}



export function part1(rawinput: string) {
  const input = parse(rawinput)

  const fileStructure = generateFileStructure(input)

  let counts: {[name: string]: number} = {root: 0}
  folders(fileStructure, [], counts)

  let count:number  = 0
  for (const [key, val] of Object.entries(counts)) {
    count += val <= 100000 ? val : 0
  }
  return count
}

export function part2(rawinput: string) {
  const input = parse(rawinput)
  const fileStructure = generateFileStructure(input)

  let counts: {[name: string]: number} = {root: 0}
  folders(fileStructure, [], counts)

  const needed = 30000000-(70000000-counts.root)
  let min = 70000000

  for (const val of Object.values(counts)) {
    if (val >= needed && val < min) {
      min = val 
    }
  }


  return min
}