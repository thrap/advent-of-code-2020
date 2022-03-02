import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n\n').reduce((acc, tile) => {
  const split = tile.split('\n')
  acc[+split[0].replace(/[^\d]/g,'')] = split.slice(1).map(l => l.split(''))
  return acc
}, {})

const part1 = (rawInput) => {
  const tiles = parseInput(rawInput)
  const neighbours = getNeighbours(tiles)

  const corners = Object.keys(neighbours).filter(id => neighbours[id].filter(x => !x).length == 2)
  return corners.reduce((acc, id) => acc * id)
}

const NORTH = 0, EAST = 1, SOUTH = 2, WEST = 3

const getNeighbours = tiles => {
  const borders = {}
  Object.keys(tiles).forEach(id => {
    const border = Array(4).fill('')

    var tile = tiles[id]

    for (var i = 0; i < 10; i++) {
      border[NORTH] += tile[0][i]    // NORTH
      border[SOUTH] += tile[10-1][i] // SOUTH
      border[WEST] += tile[i][0]    // WEST
      border[EAST] += tile[i][10-1] // EAST
    }

    borders[id] = border
  })

  const neighbours = {}

  const withReverse = arr => arr.concat(arr.map(l => l.split('').reverse().join('')))

  const allBorders = Object.keys(borders).map(
    key => withReverse(borders[key]).map(x => [x, key])
  ).flat()

  Object.keys(tiles).filter(id => {
    neighbours[id] = Array(4).fill(null)
    borders[id].forEach((b, direction) => {
      for(var i = 0; i < allBorders.length; i++) {
        if (b == allBorders[i][0] && id != allBorders[i][1]) {
          neighbours[id][direction]= allBorders[i][1]
        }
      }
    })
  })
  return neighbours
}

const rotate = arr => {
  const newArr = Array(4)
  newArr[WEST] = arr[SOUTH]
  newArr[SOUTH] = arr[EAST]
  newArr[EAST] = arr[NORTH]
  newArr[NORTH] = arr[WEST]
  return newArr
}

const mirror = arr => {
  const temp = arr[EAST]
  arr[EAST] = arr[WEST]
  arr[WEST] = temp
  return arr
}

const rotate2d = matrix => {
  const y = matrix.length - 1;
  for (var i = 0; i < matrix.length; i++) {
     for (var j = i; j < y - i; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[y - j][i];
        matrix[y - j][i] = matrix[y - i][y - j];
        matrix[y - i][y - j] = matrix[j][y - i]
        matrix[j][y - i] = temp
     }
  }
}

const mirror2d = matrix => {
  return matrix.map(row => row.reverse())
}

const part2 = (rawInput) => {
  const tiles = parseInput(rawInput)
  const neighbours = getNeighbours(tiles)

  const ids = Object.keys(tiles)

  const LENGTH = Math.sqrt(ids.length)

  var cornerId = ids.find(id => neighbours[id].filter(x => !!x).length == 2)
  var corner = neighbours[cornerId]

  while (corner[NORTH] || corner[WEST]) {
    corner = rotate(corner)
  }

  const board = Array(LENGTH).fill(0).map(_ => Array(LENGTH))
  const rotated = Array(LENGTH).fill(0).map(_ => Array(LENGTH))
  board[0][0] = cornerId
  board[1][0] = corner[SOUTH]

  for (var row = 0; row < LENGTH; row++) {

    for(var column = 0; column < LENGTH; column++) {
      const pieceId = board[row][column]

      var piece = neighbours[pieceId]

      for (var rotates = 0; rotates < 10; rotates++) {
        if (piece[NORTH] == board[row - 1]?.[column] && piece[WEST] == board[row]?.[column-1]) {
          break
        }
        if (rotates == 4) {
          piece = mirror(piece)
        }
        piece = rotate(piece)
      }

      rotated[row][column] = rotates
      board[row][column] = pieceId
      if (piece[SOUTH]) {
        board[row+1][column] = piece[SOUTH]
      }
      if (piece[EAST]) {
        board[row][column+1] = piece[EAST]
      }
    }
  }

  var square = Array(LENGTH*10).fill(0).map(_ => Array(LENGTH*10).fill(" "))
  for (var tileRow = 0; tileRow < LENGTH; tileRow++) {
    for (var tileCol = 0; tileCol < LENGTH; tileCol++) {
      const tileId = board[tileRow][tileCol]
      var tile = tiles[tileId]
      for (var rotates = 0; rotates < rotated[tileRow][tileCol]; rotates++) {
        if (rotates == 4) {
          tile = mirror2d(tile)
        }
        rotate2d(tile)
      }

      for(var i = 0; i < 10; i++) {
        for(var j = 0; j < 10; j++) {
          square[tileRow*10 + i][tileCol*10 + j] = tile[i][j]
        }
      }
    }
  }

  const borderFilter = (_, i) => i%10 != 0 && i%10 != 9
  var image = square.filter(borderFilter).map(row => row.filter(borderFilter))

  const pattern = ['                  # ','#    ##    ##    ###', ' #  #  #  #  #  #   '].map(r => r.split(''))

  for (var rotates = 0; rotates < 10; rotates++) {
    var count = 0
    for(var i = 0; i < image.length - pattern.length; i++) {
      for(var j = 0; j < image[0].length - pattern[0].length; j++) {
        var found = true
        for (var pi = 0; pi < pattern.length && found; pi++) {
          for (var pj = 0; pj < pattern[0].length && found; pj++) {
            if (pattern[pi][pj] == '#') {
              found = image[i+pi][j+pj] == '#'
            }
          }
        }
        if (found) {
          count++
        }
      }
    }
    if (count > 0)
      break

    if (rotates == 4) {
      image = mirror2d(image)
    }
    rotate2d(image)
  }

  const countHash = matrix => matrix.join('').split('').filter(c => c == '#').length

  return countHash(image) - countHash(pattern) * count
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
