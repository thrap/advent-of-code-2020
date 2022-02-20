import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => l.split('').map(c => c == '#'))

const part1 = (rawInput) => {
  var state = [parseInput(rawInput)]
  var dirs = []
  for(var i = -1; i <= 1; i++) {
    for(var j = -1; j <= 1; j++) {
      for(var k = -1; k <= 1; k++) {
        if (i != 0 || j != 0 || k != 0)
          dirs.push([i,j,k])
      }
    }
  }

  const step = (state) => {
    var newState = Array(state.length + 2).fill(0).map(_ => Array(state[0].length+2).fill(0).map(_ => Array(state[0][0].length+2).fill(0)))
    for(var i = 0; i < newState.length; i++) {
      for(var j = 0; j < newState[0].length; j++) {
        for(var k = 0; k < newState[0][0].length; k++) {
          const active = dirs.reduce((acc, [di, dj, dk]) =>
            acc + (((state[i+di-1]||[])[j+dj-1]||[])[k+dk-1] ? 1 : 0),
          0)

          if (((state[i-1]||[])[j-1]||[])[k-1]) {
            newState[i][j][k] = active == 2 || active == 3
          } else {
            newState[i][j][k] = active == 3
          }
        }
      }
    }
    return newState
  }

  for(var cycle = 1; cycle <= 6; cycle++) {
    state = step(state)
  }

  var count = 0
  for(var i = 0; i < state.length; i++) {
    for(var j = 0; j < state[0].length; j++) {
      for(var k = 0; k < state[0][0].length; k++) {
        count += state[i][j][k] ? 1 : 0
      }
    }
  }

  return count
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `.#.
..#
###`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 112 }
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
