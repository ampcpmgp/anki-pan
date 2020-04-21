const { q, client } = require('../../../_utils/faunadb')
const { handleApiError, ApiError } = require('../../../_utils/api-error')

// 未実装
module.exports = handleApiError(async (req, res) => {
  if (!req.query.ref || !req.query.ts) {
    throw new ApiError('Validation Error', 400)
  }

  const response = await client.query(
    q.Map(
      q.Map(
        q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc'), true), {
          size: 5,
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
