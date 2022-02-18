import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => l.split(' = '))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const pad = (str) => {
    while (str.length != mask.length) {
      str = "0"+str
    }
    return str
  }
  const transform = (mask, str) => {
    var newStr = ""
    for(var i = 0; i < mask.length; i++) {
      newStr += mask[i] == 'X' ? str[i] : mask[i]
    }
    return newStr
  }

  const memory = {}
  var mask = ''
  input.forEach(([l, r]) => {
    if (l == 'mask') {
      mask = r
    } else {
      const adr = +l.match(/mem\[(\d+)\]/)[1]
      const val = +r
      const binary = pad(val.toString(2))

      memory[adr] = transform(mask, binary)
    }
  });

  return Object.values(memory).map(s => parseInt(s, 2)).reduce((acc, x) => acc + x)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 165 }
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
