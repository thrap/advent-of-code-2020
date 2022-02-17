import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  var trees = 0
  for(var x = 0, y = 0; y < input.length; x+=3, y+=1) {
    if (input[y][x%input[0].length] == "#")
      trees++
  }

  return trees
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      { input: `
      ..##.......
      #...#...#..
      .#....#..#.
      ..#.#...#.#
      .#...##..#.
      ..#.##.....
      .#.#.#....#
      .#........#
      #.##...#...
      #...##....#
      .#..#...#.#
      `, expected: 7 }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: ``, expected: "" }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
