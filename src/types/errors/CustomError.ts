export class CustomError extends Error {
  type: string
  message: string
  statusCode: number

  constructor(message: string, statusCode: number) {
    super()
    this.type = 'CustomError'
    this.message = message
    this.statusCode = statusCode
  }
}
