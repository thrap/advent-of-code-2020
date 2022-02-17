import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(line => {
  const [op, arg] = line.split(' ');
  return [op, +arg]
})

const execute = (program) => {
  var acc = 0
  var point = 0

  const visited = []
  while(point != program.length && !visited.includes(point)) {
    visited.push(point)
    const [op, arg] = program[point];
    if (op == 'acc') {
      acc += arg
    }
    point += op == 'jmp' ? arg : 1
  }
  return [acc, point == program.length]

}

const part1 = (rawInput) => {
  const program = parseInput(rawInput)
  return execute(program)[0]
}


const part2 = (rawInput) => {
  const program = parseInput(rawInput)

  const swap = s => s == 'nop' ? 'jmp' : (s == 'jmp' ? 'nop' : s)
  for(var i = 0; i < program.length; i++) {
    program[i][0] = swap(program[i][0])
    const [acc, terminates] = execute(program)
    if (terminates)
      return acc
    program[i][0] = swap(program[i][0])
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
