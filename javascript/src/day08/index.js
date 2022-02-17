import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(line => {
  const [op, arg] = line.split(' ');
  return [op, +arg]
})

const part1 = (rawInput) => {
  const program = parseInput(rawInput)
  var acc = 0
  var point = 0

  const visited = []
  while(point != program.length && !visited.includes(point)) {
    visited.push(point)
    const [op, arg] = program[point];
    if (op == 'acc') {
      acc += arg
      point++
    }
    if (op == 'nop') {
      point++
    }
    if (op == 'jmp') {
      point += arg
    }
  }

  return acc
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 5 }
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
