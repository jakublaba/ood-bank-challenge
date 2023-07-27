class ResourceNotFoundError extends Error {
  private readonly _status = 404

  constructor(resourceUUID: string) {
    super(`${resourceUUID}: resource not found`)
  }

  get status() {
    return this._status
  }
}

export default ResourceNotFoundError
