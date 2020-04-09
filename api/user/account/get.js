const { getUserInfo } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')
const { getDBUser } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  const { id, nanoId } = await getDBUser(subjectClaim)

  res.json({
    id,
    nanoId,
  })
})
