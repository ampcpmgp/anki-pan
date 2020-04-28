const { SIZE } = require('../../../const/pager')
const { q, client, getDBUser } = require('../../_utils/faunadb')
const { verifyToken } = require('../../_utils/auth0')
const { handleApiError } = require('../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const { data: user } = await getDBUser(subjectClaim)

  // 最新取得
  if (!req.query.ref || !req.query.ts) {
    const response = await client.query(
      q.Map(
        q.Map(
          q.Paginate(
            q.Join(
              q.Match(q.Index('breads_by_user_nano_id'), user.nanoId),
              q.Index('breads_sort_by_ts_desc_with_ref')
            ),
            {
              size: SIZE,
            }
          ),
          q.Lambda(['ts', 'ref'], q.Get(q.Var('ref')))
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

  // 特定のパンから後ろに取得
  const response = await client.query(
    q.Map(
      q.Map(
        q.Paginate(
          q.Join(
            q.Match(q.Index('breads_by_user_nano_id'), user.nanoId),
            q.Index('breads_sort_by_ts_desc_with_ref')
          ),
          {
            size: SIZE,
            after: [
              req.query.ts - 0,
              q.Ref(q.Collection('Breads'), req.query.ref),
            ],
          }
        ),
        q.Lambda(['ts', 'ref'], q.Get(q.Var('ref')))
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
