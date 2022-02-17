import run from "aocrunner"

const parseInput = (rawInput) => rawInput.replace(/B|R/g, '1').replace(/F|L/g, '0').split('\n').map(s => parseInt(s, 2))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return Math.max(...input)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  for (var id = 0; id < 1024; id++) {
    if (input.includes(id + 1) && input.includes(id - 1) && !input.includes(id))
      return id
  }
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
