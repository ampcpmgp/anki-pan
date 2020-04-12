const { q, client } = require('../../_utils/faunadb')
const { handleApiError } = require('../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  // 最新10件取得
  if (!req.query.ref || !req.query.ts) {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc'), true), {
          size: 10,
        }),
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
      q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc'), true), {
        size: 10,
        after: [req.query.ts - 0, q.Ref(q.Collection('Breads'), req.query.ref)],
      }),
      q.Lambda(['ts', 'ref'], {
        nanoId: q.Select(['data', 'nanoId'], q.Get(q.Var('ref'))),
        title: q.Select(['data', 'title'], q.Get(q.Var('ref'))),
        userId: q.Select(['data', 'userId'], q.Get(q.Var('ref'))),
      })
    )
  )

  res.json(response)
})
