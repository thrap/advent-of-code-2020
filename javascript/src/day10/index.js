import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(x => +x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput).sort((a,b) => a-b)

  var last = input[0]
  var diff = [0,0,0,0]
  diff[last]++
  for(var i = 1; i < input.length; i++) {
    var num = input[i]
    diff[num-last]++
    last = num
  }

  return ++diff[3]*diff[1]
}

const part2 = (rawInput) => {
  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
