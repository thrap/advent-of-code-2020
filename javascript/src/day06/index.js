import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n\n").map(s => s.split("\n"))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  return input.reduce((acc, ans) => acc + Object.keys(ans.reduce((acc, s) => {
    s.split("").forEach(c => acc[c] = true)
    return acc
  }, {})).length, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `abc

a
b
c

ab
ac

a
a
a
a

b`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: "" }
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
