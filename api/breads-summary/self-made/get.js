const { q, client, getDBUser } = require('../../_utils/faunadb')
const { getUserInfo } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  const responseUserInfo = await getUserInfo(req)

  const { sub: subjectClaim } = await responseUserInfo.json()
  const user = await getDBUser(subjectClaim)

  // 最新10件取得
  if (!req.query.ref || !req.query.ts) {
    const response = await client.query(
      q.Map(
        q.Paginate(
          q.Join(
            q.Match(q.Index('breads_by_user_nano_id'), user.nanoId),
            q.Index('breads_sort_by_ts_desc_with_ref')
          ),
          {
            size: 10,
          }
        ),
        q.Lambda(['ts', 'ref'], {
          nanoId: q.Select(['data', 'nanoId'], q.Get(q.Var('ref'))),
          title: q.Select(['data', 'title'], q.Get(q.Var('ref'))),
          userId: q.Select(['data', 'userId'], q.Get(q.Var('ref'))),
        })
      )
    )

    res.json(response)
    return
  }

  // 特定のパンから後ろに最新10件取得
  const response = await client.query(
    q.Map(
      q.Paginate(
        q.Join(
          q.Match(q.Index('breads_by_user_nano_id'), user.nanoId),
          q.Index('breads_sort_by_ts_desc_with_ref')
        ),
        {
          size: 10,
          after: [
            req.query.ts - 0,
            q.Ref(q.Collection('Breads'), req.query.ref),
          ],
        }
      ),
      q.Lambda(['ts', 'ref'], {
        nanoId: q.Select(['data', 'nanoId'], q.Get(q.Var('ref'))),
        title: q.Select(['data', 'title'], q.Get(q.Var('ref'))),
        userId: q.Select(['data', 'userId'], q.Get(q.Var('ref'))),
      })
    )
  )

  res.json(response)
})
