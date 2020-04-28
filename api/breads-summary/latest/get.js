const { SIZE } = require('../../../const/pager')
const { q, client } = require('../../_utils/faunadb')
const { handleApiError } = require('../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  // 最新取得
  if (!req.query.ref || !req.query.ts) {
    const response = await client.query(
      q.Map(
        q.Map(
          q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc'), true), {
            size: SIZE,
          }),
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
        q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc'), true), {
          size: SIZE,
          after: [
            req.query.ts - 0,
            q.Ref(q.Collection('Breads'), req.query.ref),
          ],
        }),
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
