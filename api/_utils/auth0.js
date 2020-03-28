const fetch = require('node-fetch')
const config = require('../../auth0')
const ApiError = require('../_utils/api-error')

// https://auth0.com/docs/api/authentication#get-user-info
exports.getUserInfo = async function(req) {
  const url = `https://${config.domain}/userinfo`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: req.headers.authorization,
      },
    })

    return response
  } catch (error) {
    throw new ApiError('Auth Api Server Error', 503)
  }
}
