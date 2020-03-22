const { q, client } = require('../../_utils/faunadb')

module.exports = async (_, res) => {
  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('breads_sort_by_ts_desc')), { size: 10 }),
        q.Lambda(['ts', 'ref'], {
          nanoId: q.Select(['data', 'nanoId'], q.Get(q.Var('ref'))),
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
