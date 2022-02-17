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
  const input = [0].concat(parseInput(rawInput).sort((a,b) => a-b))
  input.push(input[input.length-1]+3)

  const memo = {}
  const rec = (arr, i) => {
    if (i >= arr.length - 1)
      return 1
    const str = arr.slice(i-1).join(',')
    if (memo[str]) {
      return memo[str]
    }
    var sum = 0
    if (arr[i+1] - arr[i-1] <= 3) {
      sum += rec(arr.slice(0, i).concat(arr.slice(i+1)), i)
    }
    sum += rec(arr, i+1)
    memo[str] = sum
    return sum
  }

  return rec(input, 1)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
