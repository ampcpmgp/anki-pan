const faunadb = require('faunadb')
const Provider = require('../../const/provider')
const { getSubInfo } = require('../../utils/oauth')
const { ApiError } = require('./api-error')

const q = (exports.q = faunadb.query)
const client = (exports.client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET,
}))

exports.getSubIndexName = provider => {
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

exports.getDBUser = async function(subjectClaim) {
  const { provider, id } = getSubInfo(subjectClaim)
  const indexName = exports.getSubIndexName(provider)

  try {
    const { ref, data } = await client.query(
      q.Get(q.Match(q.Index(indexName), id))
    )

    return {
      ref,
      // TODO: dataを返す。
      id: data.id,
      nanoId: data.nanoId,
    }
  } catch (error) {
    if (error.requestResult && error.requestResult.statusCode === 404) {
      throw new ApiError('Not Found', 404)
    }

    throw new Error(error)
  }
}

exports.getDBUserInfoByAccessToken = async function(accessToken) {
  try {
    const { data } = await client.query(
      q.Get(q.Match(q.Index('users_by_access_token'), accessToken))
    )

    return {
      isExists: true,
      id: data.id,
      nanoId: data.nanoId,
    }
  } catch (error) {
    if (error.requestResult && error.requestResult.statusCode === 404) {
      throw new ApiError('Not Found', 404)
    }

    throw new Error(error)
  }
}
