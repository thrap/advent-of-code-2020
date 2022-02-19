import run from "aocrunner"

const parseInput = (rawInput) => {
  const [a,b,c] = rawInput.split('\n\n').map(group => group.split('\n'))
  return [a, b.slice(1), c.slice(1).map(l => l.split(',').map(x => +x))]
}

const part1 = (rawInput) => {
  const [header, _, nums] = parseInput(rawInput)
  const ranges = header.map(x => x.split(': ')[1].split(' or ').map(range => range.split('-').map(x => +x))).flat()
  const valid = {}
  ranges.forEach(([min, max]) => {
    for(var x = min; x <= max; x++) {
      valid[x] = true
    }
  });

  return nums.flat().filter(x => !valid[x]).reduce((acc, x) => acc + x)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
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
