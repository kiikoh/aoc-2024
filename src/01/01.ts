export function parse(input: string) {
  const left = []
  const right = []

  for (const line of input.split('\n').filter(x => x.length)) {
    const [l, r] = line.split('   ')

    left.push(Number(l))
    right.push(Number(r))
  }
  return [left, right]
}

export function partOne(input: ReturnType<typeof parse>) {
  const leftSorted = input[0]?.sort()
  const rightSorted = input[1]?.sort()
  let difference = 0

  if (!leftSorted || !rightSorted || leftSorted.length != rightSorted.length)
    throw Error('invariant')

  for (let i = 0; i < leftSorted!.length; i++) {
    difference += Math.abs(leftSorted[i]! - rightSorted[i]!)
  }

  return difference
}

export function partTwo(input: ReturnType<typeof parse>) {
  let similarityScore = 0

  for (const num of input[0]!) {
    const timesSeen = input[1]!.filter(x => x === num).length

    similarityScore += num * timesSeen
  }

  return similarityScore
}
