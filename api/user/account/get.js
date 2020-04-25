const { verifyToken } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')
const { getDBUser } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const {
    data: { id, nanoId },
  } = await getDBUser(subjectClaim)

  res.json({
    id,
    nanoId,
  })
})
