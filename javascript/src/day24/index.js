import run from "aocrunner"

const dirs = {
  'e':  [2,  0],
  'se': [1, -1],
  'sw': [-1, -1],
  'w':  [-2, 0],
  'nw': [-1, 1],
  'ne': [1,  1]
}

const parseInput = input => input.split('\n').map(l => parseLine(l))

const parseLine = ([a, b, ...rest]) => {
  if (!a)
    return []
  if (!b)
    return [a]

  if (Object.keys(dirs).includes(a+b)) {
    return [a+b].concat(parseLine(rest))
  } else {
    return [a].concat(parseLine([b].concat(rest)))
  }
}

const getFlip = rawInput => {
  const input = parseInput(rawInput)

  const flip = {}
  input.map(line => {
    var x = 0
    var y = 0
    line.map(x => dirs[x]).forEach(([dx, dy]) => {
      x += dx
      y += dy
    })
    flip[[x,y]] = !flip[[x,y]]
  })
  return flip
}

const part1 = (rawInput) => {
  const flip = getFlip(rawInput)

  return Object.values(flip).filter(x => x).length
}

const part2 = (rawInput) => {
  const flip = getFlip(rawInput)

  const getNeighbours = (x, y) => Object.values(dirs).map(([dx, dy]) => [x + dx, y + dy])

  const doStep = flip => {
    const newFlip = {}
    Object.keys(flip).map(s => s.split(',').map(s => +s)).forEach(([x,y]) => {
      const neighbours = getNeighbours(x, y)

      neighbours.concat([[x,y]]).forEach(([nx, ny]) => {
        const flipped = getNeighbours(nx, ny).filter(x => flip[x]).length

        if (flip[[nx, ny]]) {
          if (flipped != 0 && flipped <= 2) {
            newFlip[[nx, ny]] = true
          }
        } else {
          if (flipped == 2) {
            newFlip[[nx, ny]] = true
          }
        }
      })
    })
    return newFlip
  }

  var asd = flip
  for(var step = 1; step <= 100; step++) {
    asd = doStep(asd)
    if (step % 10 == 0)
      console.log('step ' + step + '/100 :', Object.keys(asd).length);
  }

  return Object.keys(asd).length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
