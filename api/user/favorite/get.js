const { getUserInfo } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  const { nanoId: userNanoId } = await getDBUser(subjectClaim)

  const {
    query: { breadNanoId },
  } = req

  const isExists = await client.query(
    q.Exists(q.Match(q.Index('favorites_by_ids'), [userNanoId, breadNanoId]))
  )

  res.json({
    isExists,
  })
})
