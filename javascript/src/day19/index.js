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
      }
    })
  }

  const regex = new RegExp('^'+rules[0].replace(/ /g, '')+'$');

  return messages.filter(m => regex.test(m)).length
}

const part2 = (rawInput) => {
  const [rules, messages] = parseInput(rawInput)

  const done = { '0' : true}
  const replace = (k, v) => {
    Object.keys(rules).forEach(key => {
      rules[key] = rules[key].split(' ').map(c => c == k ? v : c).join(' ')
    })
  }


  for(var i = 0; i < 10; i++) {
    Object.keys(rules).forEach(key => {
      const rule = rules[key]
      if (!/\d/.test(rule) && !done[key]) {
        rules[key] = rules[key].replace(/ /g, '')
        if (key == '8') {
          rules[8] = '('+rules[8]+')+'
        }
        if (key == '11') {
          const a = '('+rules[42]+')';
          const b = '('+rules[31]+')'

          const c = "("+a+b+")|("+a+a+b+b+")|("+a+a+a+b+b+b+")|("+a+a+a+a+b+b+b+b+")"
          rules[key] = c
        }
        replace(key, '('+rules[key]+')');
        done[key] = true
      }
    })
  }

  const regex = new RegExp('^'+rules[0].replace(/ /g, '')+'$');

  return messages.filter(m => regex.test(m)).length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
