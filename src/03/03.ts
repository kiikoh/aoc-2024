export function parse(input: string) {
  return input
}

export function partOne(input: ReturnType<typeof parse>) {
  const multiplyOperations = input.match(/mul\(\d{1,3},\d{1,3}\)/g)

  if (!multiplyOperations) return

  let sum = 0
  for (const op of multiplyOperations) {
    const left = +op.slice(op.indexOf('(') + 1, op.indexOf(','))
    const right = +op.slice(op.indexOf(',') + 1, op.indexOf(')'))

    sum += left * right
  }

  return sum
}

export function partTwo(input: ReturnType<typeof parse>) {
  // we can remove all of the scenarios that a
  const sanitized = input
    // .replaceAll('\n', '')
    .match(/(^|do\(\)).*?(don't\(\)|$)/gs)
    ?.flatMap(x => x)
    .join('')
  if (!sanitized) return

  const multiplyOperations = sanitized.match(/mul\(\d{1,3},\d{1,3}\)/g)

  if (!multiplyOperations) return

  let sum = 0
  for (const op of multiplyOperations) {
    const left = +op.slice(op.indexOf('(') + 1, op.indexOf(','))
    const right = +op.slice(op.indexOf(',') + 1, op.indexOf(')'))

    sum += left * right
  }

  return sum
}
