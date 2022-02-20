import run from "aocrunner"

const parseInput = (rawInput) => rawInput.replace(/ /g, '').split('\n')

const evalu = (s) => {
  if (/^\d+$/.test(s))
    return +s

  return evalu(s.replace(/(\d+)([*+])(\d+)/, (_, a, op, b) =>
    op == '*' ? a * b : +a + (+b)
  ))
}

const evalu2 = (s) => {
  if (s.includes('+')) {
    return evalu2(s.replace(/(\d+)[+](\d+)/, (_, a, b) =>
      +a + (+b)
    ))
  }
  return evalu(s)
}

const brackets = (str, evalu) => {
  const repl = str.replace(/\([^()]+\)/g, (a) => evalu(a.substring(1, a.length-1)))

  if (repl == str)
    return evalu(str)
  else
    return brackets(repl, evalu)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return input.map(l => brackets(l, evalu)).reduce((acc, x) => acc + x)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  return input.map(l => brackets(l, evalu2)).reduce((acc, x) => acc + x)
}

run({
  part1: {
    tests: [
      { input: '2 * 3 + (4 * 5)', expected: 26 },
      { input: '5 + (8 * 3 + 9 + 3 * 4 * 3)', expected: 437 },
      { input: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', expected: 12240 },
      { input: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', expected: 13632 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: '1 + (2 * 3) + (4 * (5 + 6))', expected: 51 },
      { input: '2 * 3 + (4 * 5)', expected: 46 },
      { input: '5 + (8 * 3 + 9 + 3 * 4 * 3)', expected: 1445 },
      { input: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', expected: 669060 },
      { input: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', expected: 23340 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
