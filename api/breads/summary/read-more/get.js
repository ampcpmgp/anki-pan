const { q, client } = require('../../../_utils/faunadb')
const { handleApiError, ApiError } = require('../../../_utils/api-error')

module.exports = handleApiError(async (req, res) => {
  if (!req.query.ref || !req.query.ts) {
    throw new ApiError('Validation Error', 400)
  }

  const response = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc')), {
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
