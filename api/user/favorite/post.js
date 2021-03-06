const { isValid } = require('../../../utils/validator/bread/nano-id')
const { verifyToken } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const {
    data: { nanoId: userNanoId },
  } = await getDBUser(subjectClaim)

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
    // 該当のパンが存在しているか確認。
    const isExistsBread = client.query(
      q.Exists(q.Match('breads_by_nano_id', breadNanoId))
    )

    if (!isExistsBread) {
      throw new ApiError('Bread Not Found', 404)
    }

    await client.query(
      q.Create(q.Collection('Favorites'), {
        data: {
          userNanoId,
          breadNanoId,
        },
      })
    )
  } else {
    // FIXME: 削除失敗時、クライアント側にお気に入りデータが残ったままになる。
    // 対策要検討。
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
