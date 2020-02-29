const config = require('../../auth0')
const fetch = require('node-fetch')

exports.getUserInfo = async function(req) {
  const url = `https://${config.domain}/userinfo`

  const response = await fetch(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })

  return response
}
