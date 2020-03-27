class ApiError extends Error {
  /**
   * ApiError
   * @param {string} message
   * @param {number} status
   */
  constructor(message, status) {
    super(message)

    this.status = status
  }
}

module.exports = ApiError
