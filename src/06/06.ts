type MapType = 'unvisited' | 'obstacle' | 'visited' | 'player'

export function parse(input: string) {
  const map = input
    .split('\n')
    .filter(x => x.length)
    .map(x =>
      x.split('').map(char => {
        if (char === '^') return 'player'
        if (char === '.') return 'unvisited'
        if (char === '#') return 'obstacle'
        throw new Error('unkown char')
      })
    ) as MapType[][]

  const yIndex = map.findIndex(row => row.includes('player'))
  const xIndex = map[yIndex]?.findIndex(col => col === 'player')

  return { map, playerStartX: xIndex!, playerStartY: yIndex! }
}

const DIRECTIONS = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1] // left
] as const
const TIMEOUT = 10_000

export function partOne(input: ReturnType<typeof parse>) {
  let x = input.playerStartX
  let y = input.playerStartY
  let dirIndex = 0
  let direction = DIRECTIONS[dirIndex] // start facing up
  let steps = 0

  // origin is top left for x/y
  while (
    0 <= x &&
    x < input.map[0]!.length &&
    0 < y &&
    y < input.map.length - 1 &&
    steps < TIMEOUT
  ) {
    steps++
    // mark the location as visited
    input.map[y]![x] = 'visited'

    // move
    x += direction![1]!
    y += direction![0]!

    while (input.map[y]![x] === 'obstacle') {
      // move backward
      x -= direction![1]
      y -= direction![0]

      // turn 90 degrees right
      direction = DIRECTIONS[++dirIndex % 4]!

      // move forward
      x += direction[1]!
      y += direction[0]!
    }
  }

  if (steps >= TIMEOUT) {
    return 0
  }

  let count = 0
  for (const row of input.map) {
    for (const col of row) {
      if (col === 'visited') count++
    }
  }
  return count
}

export function partTwo(input: ReturnType<typeof parse>) {
  let count = 0
  // brute force? flip a random location to be an obstacle and see if it takes more than some number of turns to exit
  for (let i = 0; i < input.map.length; i++) {
    for (let j = 0; j < input.map[i]!.length; j++) {
      // cannot flip these
      if (input.map[j]![i] === 'obstacle' || input.map[j]![i] === 'player') {
        continue
      }

      const clonedInput = structuredClone(input)

      clonedInput.map[j]![i] = 'obstacle'

      const result = partOne(clonedInput)
      if (!result) {
        count++
      }
    }
  }

  return count
}
