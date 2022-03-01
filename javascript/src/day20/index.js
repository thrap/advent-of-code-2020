import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n\n').reduce((acc, tile) => {
  const split = tile.split('\n')
  acc[+split[0].replace(/[^\d]/g,'')] = split.slice(1).map(l => l.split(''))
  return acc
}, {})

const part1 = (rawInput) => {
  const tiles = parseInput(rawInput)

  const borders = {}
  Object.keys(tiles).forEach(id => {
    const border = Array(4).fill('')

    var tile = tiles[id]

    for (var i = 0; i < 10; i++) {
      border[0] += tile[0][i]
      border[1] += tile[10-1][i]
      border[2] += tile[i][0]
      border[3] += tile[i][10-1]
    }

    borders[id] = border.concat(border.map(l => l.split('').reverse().join('')))

    console.log(tiles[id].map(l => l.join('')).join('\n'));
    console.log(borders[id]);
  })

  const allBorders = Object.values(borders).flat()

  return Object.keys(tiles).filter(id => {
    var sum = 0
    borders[id].forEach(b => {
      var count = 0
      for(var i = 0; i < allBorders.length; i++) {
        if (b == allBorders[i])
          count++
      }

      if (count == 1) {
        sum ++
      }
    })
    return sum == 4
  }).reduce((acc, id) => acc * id)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 20899048083289 }
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
