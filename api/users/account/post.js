const { getUserInfo } = require('../../_utils/auth0')

module.exports = async (req, res) => {
  const response = await getUserInfo(req)

  if (response.status !== 200) {
    throw new Error('Authorization Error')
  }

  const { sub: subjectClaim } = await response.json()
  console.warn(subjectClaim)

  const {
    body: { userName },
  } = req
  const breads = []

  res.json({
    userName,
    breads,
  })
}
