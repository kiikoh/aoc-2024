export function parse(input: string) {
  const [rawPageRules, rawUpdates] = input.split('\n\n')

  if (!rawPageRules || !rawUpdates) throw Error('wtf')

  return {
    pageRules: rawPageRules
      .split('\n')
      .filter(x => x.length)
      .map(x => x.split('|').map(Number)),
    updates: rawUpdates
      .split('\n')
      .filter(x => x.length)
      .map(x => x.split(',').map(Number))
  }
}

function isCorrectOrder(update: number[], rules: number[][]) {
  for (const [beforeNumber, afterNumber] of rules) {
    const beforeIndex = update.indexOf(beforeNumber!)
    const afterIndex = update.indexOf(afterNumber!)

    // make sure both indices are in the list
    if (beforeIndex != -1 && afterIndex != -1) {
      if (beforeIndex > afterIndex) {
        return { correct: false as const, beforeIndex, afterIndex }
      }
    }
  }

  return { correct: true as const }
}

export function partOne(input: ReturnType<typeof parse>) {
  let total = 0
  for (const update of input.updates) {
    if (isCorrectOrder(update, input.pageRules).correct) {
      total += update[update.length / 2 - 0.5]!
    }
  }

  return total
}

function swapInPlace(arr: number[], i: number, j: number) {
  const tmp = arr[i]
  arr[i] = arr[j]!
  arr[j] = tmp!
}

export function partTwo(input: ReturnType<typeof parse>) {
  let total = 0
  for (const update of input.updates) {
    let result = isCorrectOrder(update, input.pageRules)

    // we do not process them if they are correct after the first pass
    if (result.correct) continue

    // continually swap the incorrect indices until it is correct
    while (!result.correct) {
      swapInPlace(update, result.beforeIndex, result.afterIndex)
      result = isCorrectOrder(update, input.pageRules)
    }

    total += update[update.length / 2 - 0.5]!
  }

  return total
}
