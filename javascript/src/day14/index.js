import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => l.split(' = '))

const pad = (str) => {
  while (str.length != 36) {
    str = "0"+str
  }
  return str
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

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

  const transform = (mask, str) => {
    var newStr = ""
    for(var i = 0; i < mask.length; i++) {
      newStr += mask[i] == '0' ? str[i] : mask[i]
    }
    return newStr
  }

  const memory = {}
  const expand = (str, val, front = '') => {
    if (str.length == 0) {
      memory[front] = val
      return
    }
    const c = str[0]
    const tail = str.substr(1)
    if (c == 'X') {
      expand(tail, val, front + '0')
      expand(tail, val, front + '1')
    } else {
      expand(tail, val, front + c)
    }
  }

  var mask = ''
  input.forEach(([l, r]) => {
    if (l == 'mask') {
      mask = r
    } else {
      const adr = +l.match(/mem\[(\d+)\]/)[1]
      const val = +r
      const binary = transform(mask, pad(adr.toString(2)))
      expand(binary, val)
    }
  });

  return Object.values(memory).reduce((acc, x) => acc + x)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
