import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('').map(x => +x)

const part1 = (rawInput) => {
  var cups = parseInput(rawInput)

  const min = Math.min(...cups)
  const max = Math.max(...cups)

  const move = (index, cups) => {
    const current = cups[index]
    const pickUp = []

    for (var i = 1; i <= 3; i++) {
      pickUp.push(cups[(index+i)%cups.length])
    }

    var destination = current - 1
    if (destination < min) {
      destination = max
    }
    while (pickUp.includes(destination)) {
      destination--
      if (destination < min) {
        destination = max
      }
    }
    const filtered = cups.filter(c => !pickUp.includes(c))
    const destIndex = filtered.indexOf(destination)
    const newCups = filtered.slice(0, destIndex+1).concat(pickUp).concat(filtered.slice(destIndex+1))

    return [(newCups.indexOf(current) + 1)%newCups.length, newCups]
  }
  var current = 0
  for (var moves = 1; moves <= 100; moves++) {
    [current, cups] = move(current, cups)
  }

  var str = ''
  for (var i = cups.indexOf(1) + 1; cups[i % cups.length] != 1; i++) {
    str += cups[i % cups.length]
  }

  return str
}

const part2 = (rawInput) => {
  var cups = parseInput(rawInput)

  const min = Math.min(...cups)
  const max = Math.max(...cups)

  var limit = 1000000
  var steps = 10000000

  for (var i = max+1; i <= limit; i++) {
    cups.push(i)
  }


  const clockwise = {}
  console.log(cups.length);
  for (var i = 0; i < cups.length; i++) {
    clockwise[cups[i]] = cups[(i+1) % cups.length]
  }

  const move = (current) => {
    const testPickUp = []
    testPickUp.push(clockwise[current])
    testPickUp.push(clockwise[clockwise[current]])
    testPickUp.push(clockwise[clockwise[clockwise[current]]])

    const temp2 = clockwise[clockwise[clockwise[clockwise[current]]]]
    /*console.log('Current: ', current, '(', index, ')');
    console.log('cups: ', cups.join(' '));*/


    var destination = current - 1
    if (destination < min) {
      destination = limit
    }
    while (testPickUp.includes(destination)) {
      destination--
      if (destination < min) {
        destination = limit
      }
    }

    //console.log(destination);
    var temp = clockwise[destination]
    clockwise[destination] = testPickUp[0]
    clockwise[testPickUp[0]] = testPickUp[1]
    clockwise[testPickUp[1]] = testPickUp[2]
    clockwise[testPickUp[2]] = temp
    clockwise[current] = temp2

    return clockwise[current]
  }

  var current = cups[0]
  for (var moves = 1; moves <= steps; moves++) {
    current = move(current)
  }

  const ret = [1]
  for(var i = 0; i < 10; i++) {
    ret.push(clockwise[ret[i]])
  }
  return ret[1]*ret[2]
}

const part1Input = `389125467`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '67384529' }
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
