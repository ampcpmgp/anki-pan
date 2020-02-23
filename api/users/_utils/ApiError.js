// 参考: https://github.com/kt3k/buttons/blob/a5eb424c163d17346707bc0d46e59d19cfd909ac/api/util/index.js#L5-L20
module.exports = class ApiError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} code
   * @param {number} status
   */
  constructor(message, code, status) {
    super(message)

    this.code = code
    this.status = status
  }
}
