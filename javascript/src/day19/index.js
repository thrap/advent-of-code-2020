import run from "aocrunner"

const parseInput = (rawInput) => {
  const [srules, messages] = rawInput.replace(/"/g,'').split('\n\n')
  const rules = {}
  srules.split('\n').map(l => l.split(': ')).map(([key, val]) => {
    rules[key] = val
  })

  return [rules, messages.split('\n')]
}

const part1 = (rawInput) => {
  const [rules, messages] = parseInput(rawInput)

  console.log(rules);

  const replace = (k, v) => {
    Object.keys(rules).forEach(key => {
      rules[key] = rules[key].split(' ').map(c => c == k ? v : c).join(' ')
    })
  }

  for(var i = 0; i < 10; i++) {
    Object.keys(rules).forEach(key => {
      const rule = rules[key]
      if (!/\d/.test(rule) && key != '0') {
        replace(key, '('+rules[key].replace(/ /g, '')+')');
        delete rules[key]
      }
    })
  }

  const regex = new RegExp('^'+rules[0].replace(/ /g, '')+'$');

  return messages.filter(m => regex.test(m)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `0: 4 1 5
1: 2 3 | 3 2
2: 7
7: 8 | 5 5
3: 4 5 | 5 4
4: "a"
5: 6
6: "b"
8: 4 4

ababbb
bababa
abbbab
aaabbb
aaaabbb`
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
