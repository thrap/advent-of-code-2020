import run from "aocrunner"

const parseInput = (rawInput) => rawInput.replace(/B|R/g, '1').replace(/F|L/g, '0').split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return Math.max(...input.map(str => parseInt(str, 2)))
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
