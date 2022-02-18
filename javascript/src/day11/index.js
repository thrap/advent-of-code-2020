import run from "aocrunner"

const parse = (input) => input.split('\n').map(l => l.split(''))

const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
const occupied = (state, i, j, part2) => {
  var count = 0
  dirs.forEach(([di, dj]) => {
    var c = (state[i+di]||[])[j+dj]
    for(var l = 2; part2 && c == '.'; l++) {
      c = (state[i+l*di]||[])[j+l*dj]
    }
    if (c == '#')
      count++
  })
  return count
}

const stateStr = (board) => board.map(x => x.join('')).join('\n')

const step = (state, part2, prev) => {
  if (prev == stateStr(state)) {
    return prev.replace(/\n/g,'').split('').filter(s => s == '#').length
  }
  var newState = Array(state.length).fill(true).map(_ => Array(state[0].length).fill('X'))
  for(var i = 0; i < state.length; i++) {
    for (var j = 0; j < state[0].length; j++) {
      const u = occupied(state, i, j, part2)
      if (state[i][j] == 'L' && u == 0) {
        newState[i][j] = '#'
      } else if (state[i][j] == '#' && u >= 4 + (part2 ? 1 : 0)) {
        newState[i][j] = 'L'
      } else {
        newState[i][j] = state[i][j]
      }
    }
  }
  return step(newState, part2, stateStr(state))
}

const part1 = (input) => step(parse(input))

const part2 = (input) => step(parse(input), true)

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
