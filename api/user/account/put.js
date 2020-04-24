const { getUserInfo } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')
const { getDBUser, q, client } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  // sub claimからユーザー取得。
  const { ref, id, nanoId } = await getDBUser(subjectClaim)

  await client.query(
    q.Update(q.Ref(ref), {
      data: {
        accessToken: req.headers.authorization,
      },
    })
  )

  res.json({
    id,
    nanoId,
  })
})
