import { CustomError } from './CustomError'

export class FailedCallApiError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode)
  }
}
