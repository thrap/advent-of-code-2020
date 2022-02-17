import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("\n\n").map(s => s.replace(/\n/g, ' ').split(" ").map(line => line.split(":")[0]))
  const isValid = (fields) => {
    const FIELDS =  ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    return FIELDS.every(field => fields.includes(field))
  }

  return input.filter(line => isValid(line)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 2 }
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
