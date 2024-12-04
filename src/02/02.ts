export function parse(input: string) {
  return input
    .split('\n')
    .filter(x => x.length)
    .map(x => x.split(' ').map(Number))
}

function isSafe(row: number[]) {
  let dir = 0
  let safe = true
  for (let i = 0; i < row.length - 1; i++) {
    // decide which direction we are moving
    if (i === 0) {
      dir = row[i]! < row[i + 1]! ? -1 : 1
    }
    const distance = row[i]! - row[i + 1]!

    // check that the signs are the same, and the distance is between 1-3
    if (0 >= dir * distance || dir * distance > 3) {
      safe = false
      break
    }
  }

  return safe
}

export function partOne(input: ReturnType<typeof parse>) {
  let safeCount = 0
  for (const row of input) {
    if (isSafe(row)) {
      safeCount++
    }
  }

  return safeCount
}

export function partTwo(input: ReturnType<typeof parse>) {
  let safeCount = 0

  for (const row of input) {
    if (isSafe(row)) {
      safeCount++
    } else {
      for (let i = 0; i < row.length; i++) {
        const modifiedRow = row.slice(0, i).concat(row.slice(i + 1))

        // test if the combo is safe after removing each of the indices
        if (isSafe(modifiedRow)) {
          safeCount++
          break
        }
      }
    }
  }

  return safeCount
}
