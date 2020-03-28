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

exports.ApiError = ApiError

exports.handleApiError = handler => async (req, res) => {
  try {
    await handler(req, res)
  } catch (error) {
    if (error instanceof ApiError) {
      res.statusCode = error.status

      res.json({
        message: error.message,
      })

      return
    }

    console.info(error)

    res.statusCode = 503
    res.json({
      message: 'Server Error',
    })
  }
}
