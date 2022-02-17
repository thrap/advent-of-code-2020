import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n\n").map(s => s.split("\n"))

const count = (ans) =>
  ans.reduce((acc, s) => {
    s.split("").forEach(c => acc[c] = (acc[c] || 0) + 1)
    return acc
  }, {})

const part1 = (input) => {
  return parseInput(input).reduce((acc, ans) => acc + Object.keys(count(ans)).length, 0)
}

const part2 = (input) => {
  const answerCount = parseInput(input).map(ans =>
    Object.values(count(ans)).filter(x => x == ans.length).length
  )
  return answerCount.reduce((acc, count) => acc + count, 0)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
