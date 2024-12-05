export function parse(input: string) {
  return input.split('\n')
}

function getSafely(input: ReturnType<typeof parse>, i: number, j: number) {
  return input[i]?.[j] ?? ''
}

function getConnected(input: ReturnType<typeof parse>, i: number, j: number) {
  const horizontal =
    getSafely(input, i, j) +
    getSafely(input, i, j + 1) +
    getSafely(input, i, j + 2) +
    getSafely(input, i, j + 3)
  const vertical =
    getSafely(input, i, j) +
    getSafely(input, i + 1, j) +
    getSafely(input, i + 2, j) +
    getSafely(input, i + 3, j)
  const diagFromTopLeft =
    getSafely(input, i, j) +
    getSafely(input, i + 1, j + 1) +
    getSafely(input, i + 2, j + 2) +
    getSafely(input, i + 3, j + 3)
  const diagFromBottomLeft =
    getSafely(input, i, j) +
    getSafely(input, i + 1, j - 1) +
    getSafely(input, i + 2, j - 2) +
    getSafely(input, i + 3, j - 3)
  return [horizontal, vertical, diagFromTopLeft, diagFromBottomLeft].filter(
    x => x.length === 4
  )
}

const WORD = 'XMAS'
const WORD_BACKWARDS = WORD.split('').reverse().join('')

export function partOne(input: ReturnType<typeof parse>) {
  let total = 0

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i]!.length; j++) {
      const possibleWords = getConnected(input, i, j)

      const xmasCount = possibleWords.filter(
        x => x === WORD || x === WORD_BACKWARDS
      )

      total += xmasCount.length
    }
  }

  return total
}

export function partTwo(input: ReturnType<typeof parse>) {
  let total = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i]!.length; j++) {
      const currentLetter = input[i]![j]!
      if (currentLetter === 'A') {
        // check the letters in an X
        const topLeft = input[i - 1]?.[j - 1]
        const topRight = input[i - 1]?.[j + 1]
        const bottomLeft = input[i + 1]?.[j - 1]
        const bottomRight = input[i + 1]?.[j + 1]

        if (
          ((topLeft === 'M' && bottomRight === 'S') ||
            (topLeft === 'S' && bottomRight === 'M')) &&
          ((topRight === 'M' && bottomLeft === 'S') ||
            (topRight === 'S' && bottomLeft === 'M'))
        ) {
          total++
        }
      }
    }
  }

  return total
}
