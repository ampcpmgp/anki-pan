require('dotenv').config()
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_DB_PROD_SECRET })

async function setup() {
  // 各DB作成
  await client.query(q.CreateCollection({ name: 'Breads' }))
  await client.query(q.CreateCollection({ name: 'Users' }))

  // パンインデックス
  await client.query(
    q.CreateIndex({
      name: 'breads_by_id',
      source: q.Collection('Breads'),
      unique: true,
      serialized: true,
      terms: [
        {
          field: ['data', 'id'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'breads_by_sub',
      source: q.Collection('Breads'),
      unique: false,
      serialized: true,
      terms: [
        {
          field: ['data', 'subjectClaim'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'breads_sort_by_ts_desc',
      source: q.Collection('Breads'),
      values: [{ field: ['ts'], reverse: true }, { field: ['ref'] }],
    })
  )

  // ユーザーインデックス
  await client.query(
    q.CreateIndex({
      name: 'users_by_id',
      source: q.Collection('Users'),
      unique: true,
      serialized: true,
      terms: [
        {
          field: ['data', 'id'],
        },
      ],
    })
  )
  await client.query(
    q.CreateIndex({
      name: 'users_by_sub',
      source: q.Collection('Users'),
      unique: true,
      serialized: true,
      terms: [
        {
          field: ['data', 'subjectClaim'],
        },
      ],
    })
  )

  console.log('Successed!')
}

async function start() {
  try {
    await setup()
  } catch (error) {
    console.info(error)
  }
}

start()
