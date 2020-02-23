const { verifyToken } = require('../_utils/jwt')

module.exports = async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)

  console.log('sub', subjectClaim)

  const displayName = ''
  const posts = []

  res.json({
    displayName,
    posts,
  })
}
