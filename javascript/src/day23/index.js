import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('').map(x => +x)

const doSteps = (cups, steps) => {
  const clockwise = {}
  for (var i = 0; i < cups.length; i++) {
    clockwise[cups[i]] = cups[(i+1) % cups.length]
  }

  const move = (current) => {
    const pick = []
    pick.push(clockwise[current])
    pick.push(clockwise[pick[0]])
    pick.push(clockwise[pick[1]])

    var destination = current - 1 || cups.length
    while (pick.includes(destination)) {
      destination = destination - 1 || cups.length
    }

    clockwise[current] = clockwise[pick[2]]

    clockwise[pick[0]] = pick[1]
    clockwise[pick[1]] = pick[2]
    clockwise[pick[2]] = clockwise[destination]
    clockwise[destination] = pick[0]

    return clockwise[current]
  }

  var current = cups[0]
  for (var moves = 1; moves <= steps; moves++) {
    current = move(current)
  }

  return clockwise
}

const part1 = (rawInput) => {
  var cups = parseInput(rawInput)

  const clockwise = doSteps(cups, 100)

  var str = ''
  var current = clockwise[1]
  while (current != 1) {
    str += current
    current = clockwise[current]
  }

  return str
}

const part2 = (rawInput) => {
  var cups = parseInput(rawInput)

  var limit = 1000000

  for (var i = cups.length+1; i <= limit; i++) {
    cups.push(i)
  }

  const clockwise = doSteps(cups, 10000000)

  return clockwise[1] * clockwise[clockwise[1]]
}

const part1Input = `389125467`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '67384529' }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: 149245887792 }
    ],
    solution: part2,
  },
})
