const config = require('../../../auth0/config.json')
const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const url = `https://${config.domain}/userinfo`

  const response = await fetch(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })

  if (response.status !== 200) {
    throw new Error('Authorization Error')
  }

  const { sub: subjectClaim } = await response.json()

  console.log(subjectClaim)

  const displayName = ''
  const posts = []

  res.json({
    displayName,
    posts,
  })
}
