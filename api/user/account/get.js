const { getUserInfo } = require('../../_utils/auth0')
const ApiError = require('../../_utils/api-error')
const { q, client, getSubIndex } = require('../../_utils/faunadb')
const { getSubInfo } = require('../../../utils/oauth')

async function getAccount(subjectClaim) {
  const { provider, id } = getSubInfo(subjectClaim)
  const index = getSubIndex(provider)

  try {
    const response = await client.query(q.Get(q.Match(q.Index(index), id)))

    return response
  } catch (error) {
    if (error.requestResult.statusCode === 404) {
      throw new ApiError('Not Found', 404)
    }

    throw new ApiError('Other Error', 503)
  }
}

module.exports = async (req, res) => {
  try {
    const response = await getUserInfo(req)

    if (response.status !== 200) {
      throw new ApiError('Authorization Error', 503)
    }

    const { sub: subjectClaim } = await response.json()
    const accountInfo = await getAccount(subjectClaim)

    res.json(accountInfo)
  } catch (error) {
    res.statusCode = error.status

    res.json({
      message: error.message,
    })
  }
}
