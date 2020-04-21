const { isValid } = require('../../../utils/validator/bread/nano-id')
const { getUserInfo } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const response = await getUserInfo(req)

  const { sub: subjectClaim } = await response.json()
  const { nanoId: userNanoId } = await getDBUser(subjectClaim)

  const {
    body: { breadNanoId, isFavorite },
  } = req

  if (!isValid(breadNanoId)) {
    throw new ApiError('Validation Error', 400)
  }

  if (typeof isFavorite !== 'boolean') {
    throw new ApiError('Validation Error', 400)
  }

  const isExists = await client.query(
    q.Exists(q.Match(q.Index('favorites_by_ids'), [userNanoId, breadNanoId]))
  )

  if (isFavorite === isExists) {
    res.json({
      isSuccess: true,
    })

    return
  }

  if (isFavorite) {
    await client.query(
      q.Create(q.Collection('Favorites'), {
        data: {
          userNanoId,
          breadNanoId,
        },
      })
    )
  } else {
    await client.query(
      q.Delete(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('favorites_by_ids'), [userNanoId, breadNanoId]))
        )
      )
    )
  }

  res.json({
    isSuccess: true,
  })
})
