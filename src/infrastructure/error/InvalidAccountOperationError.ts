import ApiError from '@error/ApiError'

class InvalidAccountOperationError extends ApiError {
  constructor(message: string) {
    super(405, message)
  }
}

export default InvalidAccountOperationError
