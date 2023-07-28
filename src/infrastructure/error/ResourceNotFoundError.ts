import ApiError from '@error/ApiError'

class ResourceNotFoundError extends ApiError {
  constructor(resourceUUID: string) {
    super(404, `${resourceUUID}: resource not found`)
  }
}

export default ResourceNotFoundError
