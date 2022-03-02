import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('').map(x => +x)

const part1 = (rawInput) => {
  var cups = parseInput(rawInput)

  const min = Math.min(...cups)
  const max = Math.max(...cups)

  const move = (index, cups) => {
    const current = cups[index]
    const pickUp = []

    for (var i = 1; i <= 3; i++) {
      pickUp.push(cups[(index+i)%cups.length])
    }

    var destination = current - 1
    if (destination < min) {
      destination = max
    }
    while (pickUp.includes(destination)) {
      destination--
      if (destination < min) {
        destination = max
      }
    }

    const filtered = cups.filter(c => !pickUp.includes(c))
    const destIndex = filtered.indexOf(destination)
    const newCups = filtered.slice(0, destIndex+1).concat(pickUp).concat(filtered.slice(destIndex+1))

    return [(newCups.indexOf(current) + 1)%newCups.length, newCups]
  }

  var current = 0
  for (var moves = 1; moves <= 100; moves++) {
    [current, cups] = move(current, cups)
  }

  var str = ''
  for (var i = cups.indexOf(1) + 1; cups[i % cups.length] != 1; i++) {
    str += cups[i % cups.length]
  }

  return str
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
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
      { input: part2Input, expected: "" }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
