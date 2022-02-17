import run from 'aocrunner'

const parseInput = (rawInput) => rawInput.split('\n\n').map(s => s.replace(/\n/g, ' ').split(' ').map(line => line.split(':')))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const isValid = (fields) => {
    const FIELDS =  ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    return FIELDS.every(field => fields.map(x => x[0]).includes(field))
  }

  return input.filter(line => isValid(line)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const isValid = (pass) => {
    const fields = pass.reduce((acc, [a, b]) => {
      acc[a] = b; return acc
    }, {})
    const FIELDS =  [
      ['byr', str => str >= 1920 && str <= 2002],
      ['iyr', str => str >= 2010 && str <= 2020],
      ['eyr', str => str >= 2020 && str <= 2030],
      ['hgt', str => {
        const [_, size, metric] =  str.split(/(\d+)/)
        if (metric == 'cm')
        return size >= 150 && size <= 193
        return metric == 'in' && size >= 59 && size <= 76
      }],
      ['hcl', str => /^#[0-9a-f]{6}$/.test(str)],
      ['ecl', str => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str)],
      ['pid', str => /^[0-9]{9}$/.test(str)],
    ]
    return FIELDS.every(([field, validator]) => validator(fields[field] || ''))
  }

  return input.filter(line => isValid(line)).length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
