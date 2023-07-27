class InvalidAccountFilterError extends Error {
  private readonly _status = 400

  constructor(message: string) {
    super(message)
  }

  get status() {
    return this._status
  }
}

export default InvalidAccountFilterError
