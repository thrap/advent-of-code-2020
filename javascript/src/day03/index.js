import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const trees = (input, dx, dy) => {
  var trees = 0
  for(var x = 0, y = 0; y < input.length; x+=dx, y+=dy) {
    if (input[y][x%input[0].length] == "#")
      trees++
  }
  return trees
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return trees(input, 3, 1)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return trees(input, 1, 1) * trees(input, 3, 1) * trees(input, 5, 1) * trees(input, 7, 1) * trees(input, 1, 2)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
