const { verifyToken } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const {
    query: { nanoId },
  } = req

  try {
    const response = await client.query(
      q.Get(q.Match(q.Index('breads_by_nano_id'), nanoId))
    )

    if (response.data.isPublic) {
      res.json(response.data)
      return
    }

    const { sub: subjectClaim } = await verifyToken(req)
    const user = await getDBUser(subjectClaim)

    if (user.nanoId !== response.data.userNanoId) {
      throw new ApiError('Forbidden', 403)
    }

    res.json(response.data)
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new ApiError('NotFound', 404)
    }

    throw new Error(error)
  }
})
