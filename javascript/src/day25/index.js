import run from "aocrunner"

const f = (subject, loopSize) => {
  var value = 1
  for (var i = 1; i <= loopSize; i++) {
    value = (subject * value) % 20201227
  }
  return value
}

const solution = (rawInput) => {
  const [a, b] = rawInput.split('\n').map(x => +x)

  var value = 1
  var subject = 7

  var loop = []
  for (var i = 1; loop.length != 2; i++) {
    value = (subject * value) % 20201227
    if (value == a || value == b) {
      loop.push(i)
    }
  }

  return f(f(7, loop[0]), loop[1])
}

run({
  part1: {
    solution
  },
})
