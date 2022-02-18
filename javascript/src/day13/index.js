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
  const [_, str] = parseInput(rawInput)
  const busses = str.replace(/x/g, 1).split(',').map(b => +b)
  const factors = busses.map((b, i) => [b, i])

  var x = 0
  var step = 1

  for (var i = 0; i < factors.length; i++) {
    var [p, dx] = factors[i]
    while ((x + dx) % p != 0) {
      x += step
    }
    step *= p
  }

  return x
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
