const { getUserInfo } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { q, client, getSubIndex } = require('../../_utils/faunadb')
const { getSubInfo } = require('../../../utils/oauth')

async function get(subjectClaim) {
  const { provider, id } = getSubInfo(subjectClaim)
  const index = getSubIndex(provider)

  try {
    const response = await client.query(q.Get(q.Match(q.Index(index), id)))

    return response
  } catch (error) {
    if (error.requestResult && error.requestResult.statusCode === 404) {
      throw new ApiError('Not Found', 404)
    }

    throw new Error(error)
  }
}

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  const {
    data: { id, nanoId },
  } = await get(subjectClaim)

  res.json({
    id,
    nanoId,
  })
})
