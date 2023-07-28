class ApiError extends Error {
  constructor(
    protected readonly _status: number,
    message: string,
  ) {
    super(message)
  }

  get status() {
    return this._status
  }
}

export default ApiError
