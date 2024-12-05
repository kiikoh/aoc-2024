/**
 * Mimics Python's zip() function in TypeScript with type safety
 * Creates a tuple of elements from input arrays at the same index
 *
 * @param arrays Variable number of input arrays to zip together
 * @returns An array of tuples containing elements from input arrays
 */
export function zip<T extends any[]>(
  ...arrays: T
): { [K in keyof T]: T[K] extends any[] ? T[K][number] : never }[] {
  // Find the length of the shortest input array
  const minLength = Math.min(...arrays.map(arr => arr.length))

  // Create zipped result with preserved types
  return Array.from(
    { length: minLength },
    (_, i) =>
      arrays.map(arr => arr[i]) as {
        [K in keyof T]: T[K] extends any[] ? T[K][number] : never
      }
  )
}
