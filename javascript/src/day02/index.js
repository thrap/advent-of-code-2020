import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n")

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const isValid = (line) => {
    const [policy, str] = line.split(": ")
    const [repeats, char] = policy.split(" ")
    const [min, max] = repeats.split("-").map(x => parseInt(x))
    const occurrences = str.split(char).length-1

    return occurrences >= min && occurrences <= max
  }

  return input.filter(line => isValid(line)).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const isValid = (line) => {
    const [policy, str] = line.split(": ")
    const [repeats, char] = policy.split(" ")
    const [min, max] = repeats.split("-").map(x => parseInt(x))

    return str[min-1] == char ^ str[max-1] == char
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
