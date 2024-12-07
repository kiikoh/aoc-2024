export function parse(input: string) {
  return input
    .split('\n')
    .filter(x => x.length)
    .map(x => {
      const [solution, numbers] = x.split(': ')
      return {
        solution: Number(solution),
        numbers: numbers!.split(' ').map(Number)
      }
    })
}

function canPassTest(
  target: number,
  current: number,
  values: number[]
): boolean {
  if (current > target) return false
  if (values.length === 0) return current === target

  return (
    canPassTest(target, current * values[0]!, values.slice(1)) ||
    canPassTest(target, current + values[0]!, values.slice(1))
  )
}

export function partOne(input: ReturnType<typeof parse>) {
  let total = 0
  for (const test of input) {
    if (canPassTest(test.solution, 0, test.numbers)) {
      total += test.solution

      console.log(total, test.solution, test.numbers)
    }
  }

  return total
}

export function partTwo(input: ReturnType<typeof parse>) {}
