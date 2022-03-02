import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(l => {
  const split = l.split(" (contains ")
  return [split[0].split(" "), split[1].substring(0,split[1].length-1).split(', ')]
})

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const candidates = {}
  input.forEach(([ingredients, allergens]) => {
    allergens.forEach(allergen => {
      if (!candidates[allergen])
        candidates[allergen] = []
      candidates[allergen].push(new Set(ingredients))
    })
  })

  const intersect = (a, b) => new Set([...a].filter(i => b.has(i)));

  const allergens = {}
  const mapping = {}
  // kan gjøre dette i første foreach
  Object.keys(candidates).forEach(allergen => {
    const set = candidates[allergen].reduce((acc, set) => intersect(acc, set))
    allergens[allergen] = set
  })

  console.log(allergens);

  const removeIngredient = ingredient => {
    Object.keys(allergens).forEach(allergen => {
      allergens[allergen].delete(ingredient)
    })
  }

  for(var i = 0; i < 100; i++) {
    Object.keys(allergens).forEach(allergen => {
      const set = allergens[allergen]
      if (set.size == 1) {
        const ingredient = [...set][0];
        removeIngredient(ingredient)
        delete allergens[allergen]
        mapping[allergen] = ingredient
        console.log(allergen, ingredient);
      }
    })
  }

  const dangerous = new Set(Object.values(mapping))

  return input.map(x => x[0].filter(i => !dangerous.has(i))).flat().length
  console.log(dangerous);

  console.log(allergens);

  return
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`
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
