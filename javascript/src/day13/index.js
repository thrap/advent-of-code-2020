import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const [time, str] = parseInput(rawInput)
  const busses = str.split(',').filter(c => c != 'x').map(b => +b)

  var min = Number.MAX_VALUE
  var earliest = []
  busses.forEach(bus => {
    const dep = Math.ceil(time/bus)*bus
    if (dep < min) {
      min = dep
      earliest = [bus, dep - time]
    }
  })

  return earliest[0] * earliest[1]
}

const part2 = (rawInput) => {
  return
}

const part1Input = `939
7,13,x,x,59,x,31,19`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 295 }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 1068781 }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
