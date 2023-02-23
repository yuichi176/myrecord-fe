export const getToday = (): string => {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('00' + (date.getMonth() + 1)).slice(-2)
  const d = ('00' + date.getDate()).slice(-2)
  const result = y + '/' + m + '/' + d
  return result
}

export const isObject = <T extends Object>(value: unknown): value is { [P in keyof T]?: unknown } => {
  return typeof value === 'object' && value !== null
}
