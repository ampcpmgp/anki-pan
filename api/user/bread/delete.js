const { verifyToken } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')
const { bread } = require('../../../utils/validator')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const { data: user } = await getDBUser(subjectClaim)

  const { nanoId } = req.body

  if (!bread.nanoId.isValid(nanoId)) {
    throw new ApiError('NanoId Error', 400)
  }

  try {
    await client.query(
      q.Delete(
        q.Select(
          'ref',
          q.Get(
            q.Intersection(
              q.Match(q.Index('breads_by_nano_id'), nanoId),
              q.Match(q.Index('breads_by_user_nano_id'), user.nanoId)
            )
          )
        )
      )
    )

    res.json({
      message: 'success',
      nanoId,
    })
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new ApiError('NotFound', 404)
    }

    throw new Error(error)
  }
})
