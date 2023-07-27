class InvalidAccountOperationError extends Error {
  private readonly _status = 405

  constructor(message: string) {
    super(message)
  }

  get status() {
    return this._status
  }
}

export default InvalidAccountOperationError
