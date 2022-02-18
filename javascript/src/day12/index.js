import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map(l => [l[0], +l.substr(1)])
  const dirs = [[-1,0],[0,1],[1,0],[0,-1]]
  var dir = 1
  const pos = [0,0]

  input.forEach(([action, val]) => {
    if (action == 'N') {
      pos[0] -= val
    } else if (action == 'S') {
      pos[0] += val
    } else if (action == 'E') {
      pos[1] += val
    } else if (action == 'W') {
      pos[1] -= val
    } else if (action == 'R') {
      dir += val/90
    } else if (action == 'L') {
      dir -= val/90
    } else if (action == 'F') {
      const d = dirs[(4 + dir % 4) % 4]
      pos[0] += d[0] * val
      pos[1] += d[1] * val
    }
  });

  return Math.abs(pos[0]) + Math.abs(pos[1])
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).map(l => [l[0], +l.substr(1)])
  const pos = [0,0]
  var way = [-1,10]

  input.forEach(([action, val]) => {
    if (action == 'N') {
      way[0] -= val
    } else if (action == 'S') {
      way[0] += val
    } else if (action == 'E') {
      way[1] += val
    } else if (action == 'W') {
      way[1] -= val
    } else if (action == 'R') {
      var steps = val/90
      for(var i = 0; i < steps; i++) {
        way = [way[1], -way[0]]
      }
    } else if (action == 'L') {
      var steps = val/90
      for(var i = 0; i < steps; i++) {
        way = [-way[1], way[0]]
      }
    } else if (action == 'F') {
      pos[0] += way[0] * val
      pos[1] += way[1] * val
    }
  });

  return Math.abs(pos[0]) + Math.abs(pos[1])
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
