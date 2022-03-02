import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => {
  const split = l.split(" (contains ")
  return [split[0].split(" "), split[1].substring(0,split[1].length-1).split(', ')]
})

const intersect = (a, b) => new Set([...a].filter(i => b.has(i)));

const getMapping = input => {
  const candidates = {}
  input.forEach(([ingredients, allergens]) => {
    allergens.forEach(allergen => {
      if (!candidates[allergen])
        candidates[allergen] = new Set(ingredients)
      candidates[allergen] = intersect(new Set(ingredients), candidates[allergen])
    })
  })

  const removeIngredient = ingredient => {
    Object.keys(candidates).forEach(allergen => {
      candidates[allergen].delete(ingredient)
    })
  }

  const mapping = {}
  for(var i = 0; i < 100; i++) {
    Object.keys(candidates).forEach(allergen => {
      const set = candidates[allergen]
      if (set.size == 1) {
        const ingredient = [...set][0];
        removeIngredient(ingredient)
        delete candidates[allergen]
        mapping[allergen] = ingredient
      }
    })
  }

  return mapping
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const mapping = getMapping(input)

  const dangerous = new Set(Object.values(mapping))

  return input.map(x => x[0].filter(i => !dangerous.has(i))).flat().length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const mapping = getMapping(input)

  return Object.keys(mapping).sort().map(allergen => mapping[allergen]).join(',');
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
