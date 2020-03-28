const fetch = require('node-fetch')
const config = require('../../auth0')

// https://auth0.com/docs/api/authentication#get-user-info
exports.getUserInfo = async function(req) {
  const url = `https://${config.domain}/userinfo`

  return fetch(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })
}
