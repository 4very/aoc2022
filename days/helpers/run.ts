

export function runWithTime(func: (input: string) => number | string, input: string): { result: number | string, time: number } {
  const startTime = performance.now()
  const result = func(input)
  return { result, time: performance.now() - startTime }
}