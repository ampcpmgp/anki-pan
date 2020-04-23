const { q, client, getDBUser } = require('../../_utils/faunadb')
const { getUserInfo } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  const responseUserInfo = await getUserInfo(req)

  const { sub: subjectClaim } = await responseUserInfo.json()
  const user = await getDBUser(subjectClaim)

  // 最新5件取得
  if (!req.query.ref || !req.query.nanoId || !req.query.ts) {
    const response = await client.query(
      q.Map(
        q.Map(
          q.Paginate(
            q.Match(q.Index('favorites_by_user_nano_id'), user.nanoId),
            {
              size: 5,
            }
          ),
          q.Lambda(
            ['ts', 'breadNanoId'],
            q.Get(q.Match(q.Index('breads_by_nano_id'), q.Var('breadNanoId')))
          )
        ),
        q.Lambda('item', {
          nanoId: q.Select(['data', 'nanoId'], q.Var('item')),
          title: q.Select(['data', 'title'], q.Var('item')),
          userId: q.Select(['data', 'userId'], q.Var('item')),
        })
      )
    )
    res.json(response)
    return
  }

  // 特定のパンから後ろに最新5件取得
  const response = await client.query(
    q.Map(
      q.Map(
        q.Paginate(q.Match(q.Index('favorites_by_user_nano_id'), user.nanoId), {
          size: 5,
          after: [
            req.query.ts - 0,
            req.query.nanoId,
            q.Ref(q.Collection('Breads'), req.query.ref),
          ],
        }),
        q.Lambda(
          ['ts', 'breadNanoId'],
          q.Get(q.Match(q.Index('breads_by_nano_id'), q.Var('breadNanoId')))
        )
      ),
      q.Lambda('item', {
        nanoId: q.Select(['data', 'nanoId'], q.Var('item')),
        title: q.Select(['data', 'title'], q.Var('item')),
        userId: q.Select(['data', 'userId'], q.Var('item')),
      })
    )
  )

  res.json(response)
})
