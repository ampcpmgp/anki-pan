const config = require('../../auth0')
const fetch = require('node-fetch')

exports.getUserInfo = async function(req) {
  const url = `https://${config.domain}/userinfo`

  return fetch(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })
}
