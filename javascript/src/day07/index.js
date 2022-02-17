import run from "aocrunner"

const parseInput = (rawInput) => {
  const graph = {}
  rawInput.replace(/ ?bag(s)?\.?/g, '').split('\n').forEach(x => {
    const [root, tail] = x.split(' contain ')
    if (tail.includes('no other')) {
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
    if (node == 'shiny gold')
      return true
    return graph[node].reduce((acc, [_, child]) => acc || hasGold(child), false)
  }
  return Object.keys(graph).filter(node => hasGold(node)).length - 1
}

const part2 = (rawInput) => {
  const graph = parseInput(rawInput)

  const countChildren = (node) => {
    if (graph[node].length == 0)
      return 1
    return graph[node].reduce((acc, [count, child]) => acc + count * countChildren(child), 1)
  }

  return countChildren('shiny gold') - 1
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
