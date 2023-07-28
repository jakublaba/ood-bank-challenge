import ApiError from '@error/ApiError'

class InvalidAccountFilterError extends ApiError {
  constructor(message: string) {
    super(400, message)
  }
}

export default InvalidAccountFilterError
