import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(x => +x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const length = 25
  var cache = input.slice(0, length)
  const contains = x => {
    for(var i = 0; i < length; i++) {
      for (var j = i + 1; j < length; j++) {
        if (cache[i] + cache[j] == x)
          return true
      }
    }
    return false
  }

  for (var i = length; i < input.length; i++) {
    if (contains(input[i])) {
      cache = cache.slice(1).concat([input[i]])
    } else {
      return input[i]
    }
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const invalid = part1(rawInput)

  for (var length = 2; length < 1000; length++) {
    for (var start = 0; start + length < input.length; start++) {
      const nums = input.slice(start, start + length)
      if (nums.reduce((acc, x) => acc + x, 0) == invalid) {
        return Math.max(...nums) + Math.min(...nums)
      }
    }
  }
  return invalid
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
