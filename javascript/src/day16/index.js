import run from "aocrunner"

const parseInput = (rawInput) => {
  const [a,b,c] = rawInput.split('\n\n').map(group => group.split('\n'))
  return [a, b.slice(1)[0].split(',').map(x => +x), c.slice(1).map(l => l.split(',').map(x => +x))]
}

const part1 = (rawInput) => {
  const [header, _, nums] = parseInput(rawInput)
  const ranges = header.map(x => x.split(': ')[1].split(' or ').map(range => range.split('-').map(x => +x))).flat()
  const valid = {}
  ranges.forEach(([min, max]) => {
    for(var x = min; x <= max; x++) {
      valid[x] = true
    }
  });

  return nums.flat().filter(x => !valid[x]).reduce((acc, x) => acc + x)
}

const part2 = (rawInput) => {
  const [header, ticket, nearby] = parseInput(rawInput)
  const fields = header.map(x => [x.split(': ')[0], x.split(': ')[1].split(' or ').map(range => range.split('-').map(x => +x))])

  const candidates = {}
  fields.forEach(([field, range]) => {
    range.forEach(([min, max]) => {
      for(var x = min; x <= max; x++) {
        if (!candidates[x]) {
          candidates[x] = [field]
        } else {
          candidates[x].push(field)
        }
      }
    })
  });

  const valid = nearby.filter(x => x.every(n => candidates[n]))

  var possible = []
  for(var pos = 0; pos < valid[0].length; pos++) {
    var candidate = candidates[valid[0][pos]]
    for(var i = 0; i < valid.length; i++) {
      var b = new Set(candidates[valid[i][pos]])
      candidate = candidate.filter(x => b.has(x))
    }
    possible.push(candidate)
  }

  const correct = {}

  for (var i = 0; i < 100; i++) {
    for(var pos = 0; pos < valid[0].length; pos++) {
      const asd = possible[pos].filter(x => !Object.keys(correct).includes(x))
      if (asd.length == 1) {
        correct[asd[0]] = pos
      }
    }
  }

  var product = 1
  Object.keys(correct).filter(field => field.substring(0, 9) == 'departure').forEach(field => {
    product *= ticket[correct[field]]
  })

  return product
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
