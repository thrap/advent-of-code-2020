import run from "aocrunner"

const dirs = {
  'e':  [2,  0],
  'se': [1, -1],
  'sw': [-1, -1],
  'w':  [-2, 0],
  'nw': [-1, 1],
  'ne': [1,  1]
}

const parseInput = input => input.split('\n').map(l => parseLine(l))

const parseLine = ([a, b, ...rest]) => {
  if (!a)
    return []
  if (!b)
    return [a]

  if (Object.keys(dirs).includes(a+b)) {
    return [a+b].concat(parseLine(rest))
  } else {
    return [a].concat(parseLine([b].concat(rest)))
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const flip = {}
  input.map(line => {
    var x = 0
    var y = 0
    line.map(x => dirs[x]).forEach(([dx, dy]) => {
      x += dx
      y += dy
    })
    flip[x+' '+y] = !flip[x+' '+y]
  })

  return Object.values(flip).filter(x => x).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 10 }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: "" }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
