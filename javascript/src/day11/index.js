import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => l.split(''))

const part1 = (rawInput) => {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
  var state = parseInput(rawInput)

  const stateStr = (board) => board.map(x => x.join('')).join('\n')

  const printBoard = (board) => {
    console.log(stateStr(board))
    console.log();
  }

  const step = (state) => {
    const around = (i, j) => {
      const count = [0, 0]
      dirs.forEach(([di, dj]) => {
        const c = (state[i+di]||[])[j+dj]
        if (c == 'L')
          count[0]++
        if (c == '#')
          count[1]++
      })
      return count
    }

    var newState = Array(state.length).fill(true).map(_ => Array(state[0].length).fill('X'))
    for(var i = 0; i < state.length; i++) {
      for (var j = 0; j < state[0].length; j++) {
        const u = around(i, j)
        if (state[i][j] == 'L' && u[1] == 0) {
          newState[i][j] = '#'
        } else if (state[i][j] == '#' && u[1] >= 4) {
          newState[i][j] = 'L'
        } else {
          newState[i][j] = state[i][j]
        }
      }
    }
    return newState
  }

  var prev
  for(var steps = 0; prev != stateStr(state); steps++) {
    prev = stateStr(state)
    state = step(state)
  }
  return prev.replace(/\n/g,'').split('').filter(s => s == '#').length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 37 }
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
