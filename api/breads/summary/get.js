const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })

module.exports = async (_, res) => {
  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('breads')), { size: 10 }),
        q.Lambda('ref', {
          id: q.Select(['data', 'id'], q.Get(q.Var('ref'))),
          title: q.Select(['data', 'title'], q.Get(q.Var('ref'))),
          userId: q.Select(['data', 'userId'], q.Get(q.Var('ref'))),
        })
      )
    )

    console.log(response)

    res.json({
      breads: response.data,
    })
  } catch (error) {
    console.error(error)
    res.statusCode = 503
    res.end()
  }
}
