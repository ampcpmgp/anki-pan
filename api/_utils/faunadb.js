const faunadb = require('faunadb')
const Provider = require('../../const/provider')

exports.q = faunadb.query
exports.client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET })

exports.getSubIndex = provider => {
  switch (provider) {
    case Provider.TWITTER:
      return 'users_by_sub_twitter'
    case Provider.GITHUB:
      return 'users_by_sub_github'
    case Provider.GOOGLE:
      return 'users_by_sub_google'
    default:
      console.warn(`provider: ${provider}`)
  }
}
