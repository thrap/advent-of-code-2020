import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n\n').map(x => x.split('\n').slice(1).map(x => +x))

const part1 = (rawInput) => {
  const [deckA, deckB] = parseInput(rawInput)

  while(deckA.length && deckB.length) {
    const a = deckA.shift()
    const b = deckB.shift()
    if (a > b) {
      deckA.push(a)
      deckA.push(b)
    } else {
      deckB.push(b)
      deckB.push(a)
    }
  }

  return deckA.concat(deckB).reverse().reduce((acc, x, i) => acc + x*(i+1), 0)
}

const part2 = (rawInput) => {
  const [deckA, deckB] = parseInput(rawInput)

  var concat = []
  const round = (A, B, acc) => {
    concat = A.concat(B)

    if (!A.length) return 2
    if (!B.length) return 1

    const str1 = "A: "+A
    const str2 = "B: "+B
    if (acc[str1] || acc[str2]) return 1

    acc[str1] = true
    acc[str2] = true

    const a = A.shift()
    const b = B.shift()

    const recur = a <= A.length && b <= B.length
    const winner = recur ? game(A.slice(0, a), B.slice(0, b)) : (a > b ? 1 : 2)
    if (winner == 1) {
      return round(A.concat([a,b]), B, acc)
    } else {
      return round(A, B.concat([b,a]), acc)
    }
  }

  const game = (A, B) => {
    return round(A, B, {})
  }

  game(deckA, deckB)

  return concat.reverse().reduce((acc, x, i) => acc + x*(i+1), 0)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
