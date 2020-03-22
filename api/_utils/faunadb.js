const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })

module.exports = { q, client }
