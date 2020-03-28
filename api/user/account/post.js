const nanoid = require('nanoid')
const Provider = require('../../../const/provider')
const { getSubInfo } = require('../../../utils/oauth')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getUserInfo } = require('../../_utils/auth0')
const { q, client } = require('../../_utils/faunadb')

async function post({ id, subjectClaim }) {
  const { provider, id: subId } = getSubInfo(subjectClaim)

  const sub = {}

  switch (provider) {
    case Provider.GITHUB:
      sub.github = subId
      break
    case Provider.TWITTER:
      sub.twitter = subId
      break
    case Provider.GOOGLE:
      sub.google = subId
      break
    default:
      throw new ApiError('Subject Claim Error', 400)
  }

  try {
    const response = await client.query(
      q.Create(q.Collection('Users'), {
        data: {
          nanoId: nanoid(),
          id,
          sub,
        },
      })
    )

    return response
  } catch (error) {
    if (error.requestResult && error.requestResult.statusCode === 400) {
      throw new ApiError('Id Duplicate', 409)
    }

    throw new Error(error)
  }
}

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  const { id } = req.body

  await post({
    id,
    subjectClaim,
  })

  res.json({
    success: true,
  })
})
