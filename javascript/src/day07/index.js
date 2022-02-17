import run from "aocrunner"

const parseInput = (rawInput) => {
  const graph = {}
  rawInput.replace(/ ?bag(s)?\.?/g, '').split('\n').forEach(x => {
    const [root, tail] = x.split(" contain ")
    if (tail.includes("no other")) {
      graph[root] = []
      return
    }
    graph[root] = tail.split(', ').map(line => {
      var [_, count, child] = line.split(/(\d+) (.+)/);
      return [+count, child]
    })
  })
  return graph
}

const part1 = (rawInput) => {
  const graph = parseInput(rawInput)

  const hasGold = (node) => {
    if (node == "shiny gold")
      return true
    return graph[node].reduce((acc, [_, child]) => acc || hasGold(child), false)
  }
  return Object.keys(graph).filter(node => hasGold(node)).length - 1
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 4 }
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
