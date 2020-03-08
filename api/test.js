// TODO: 削除
const faunadb = require('faunadb')
// const nanoid = require('nanoid')

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })

module.exports = async (req, res) => {
  await create()
  await paginate()
  // await create_post()

  res.json({
    body: req.body,
    query: req.query,
  })
}

async function create() {
  var response = await client
    .query(
      q.Create(q.Collection('users'), { data: { id: `user-id-${Date.now()}` } })
    )
    .catch(error => console.info(error))

  console.log(response.ref)
}

// async function create_post () {
// var response = await client.query(
//   q.Create(
//     q.Collection('posts'),
//     { data: { id: nanoid(), user: 'user-id', title: 'タイトル' } }
//   )
// ).catch(error => console.info(error))

// console.log(response.ref)
// }

async function paginate() {
  var response = await client.query(
    q.Get(q.Match(q.Index('users_by_id'), 'user-id'))
  )

  console.log(response)
}
