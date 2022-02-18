import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split(',').map(c => +c)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  console.log(input)

  const spoken = {}
  input.slice(0, input.length-1).forEach((x, i) => spoken[x] = i+1)

  var last = input[input.length - 1]

  for(var turn = input.length + 1; turn <= 2020; turn++) {
    if (!spoken[last]) {
      spoken[last] = turn - 1
      //console.log(turn, 0);
      last = 0
    } else {
      const tmp = turn - 1 - spoken[last]
      spoken[last] = turn - 1

      //console.log(turn, tmp);
      last = tmp
    }
  }

  console.log(last);

  return last
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  console.log(input)

  const spoken = {}
  input.slice(0, input.length-1).forEach((x, i) => spoken[x] = i+1)

  var last = input[input.length - 1]

  for(var turn = input.length + 1; turn <= 30000000; turn++) {
    if (turn % 10000 == 0)
      console.log(turn);
    if (!spoken[last]) {
      spoken[last] = turn - 1
      last = 0
    } else {
      const tmp = turn - 1 - spoken[last]
      spoken[last] = turn - 1
      last = tmp
    }
  }

  console.log(last);

  return last
}

run({
  part1: {
    tests: [
      { input: `2,1,3`, expected: 10 },
      { input: `1,3,2`, expected: 1 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
