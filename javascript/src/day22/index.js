import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n\n').map(x => x.split('\n').slice(1).map(x => +x))

const part1 = (rawInput) => {
  const [deckA, deckB] = parseInput(rawInput)

  while(deckA.length && deckB.length) {
    const a = deckA.shift()
    const b = deckB.shift()
    if (a > b) {
      deckA.push(a)
      deckA.push(b)
    } else {
      deckB.push(b)
      deckB.push(a)
    }
  }

  return deckA.concat(deckB).reverse().reduce((acc, x, i) => acc + x*(i+1), 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: "" }
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
