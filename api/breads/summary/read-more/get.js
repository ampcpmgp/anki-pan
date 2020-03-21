const { q, client } = require('../../../_utils/faunadb')

module.exports = async (req, res) => {
  if (!req.query.ref || !req.query.ts) {
    res.statusCode = 400
    res.json({})
    return
  }

  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc')), {
          size: 10,
          after: [
            req.query.ts - 0,
            q.Ref(q.Collection('Breads'), req.query.ref),
          ],
        }),
        q.Lambda(['ts', 'ref'], {
          id: q.Select(['data', 'id'], q.Get(q.Var('ref'))),
          title: q.Select(['data', 'title'], q.Get(q.Var('ref'))),
          userId: q.Select(['data', 'userId'], q.Get(q.Var('ref'))),
        })
      )
    )

    res.json(response)
  } catch (error) {
    console.error(error)
    res.statusCode = 503
    res.json({})
  }
}
