const jwt = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')
const ms = require('ms')
const ApiError = require('../_utils/ApiError')
const { CODE_INVALID_CREDENTIALS } = require('../_utils/error-code')

const client = jwksRsa({
  strictSsl: true, // Default value
  cache: true, // Default value
  cacheMaxEntries: 5, // Default value
  cacheMaxAge: ms('10m'), // Default value
  rateLimit: true,
  jwksRequestsPerMinute: 10, // Default value
  jwksUri: 'https://dev-3a2raq64.auth0.com/.well-known/jwks.json',
  requestHeaders: {}, // Optional
  requestAgentOptions: {}, // Optional
})

function getPublicKey(kid) {
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        return reject(err)
      }

      const pubKey = key.getPublicKey()

      resolve(pubKey)
    })
  })
}

function getToken(req) {
  const auth = req.headers.authorization

  if (!auth) {
    throw new ApiError('No Authorization header', CODE_INVALID_CREDENTIALS, 400)
  }

  const [scheme, token] = auth.split(' ', 2)

  if (!scheme || !token || !/^Bearer$/i.test(scheme)) {
    throw new ApiError('Invalid Credentials', CODE_INVALID_CREDENTIALS, 400)
  }

  return token
}

function decode(token) {
  const decoded = jwt.decode(token, { complete: true }) || {}

  return decoded
}

function verify(token, pubKey) {
  try {
    jwt.verify(token, pubKey)
  } catch (e) {
    console.info(e)
    throw new ApiError('Invalid Token', CODE_INVALID_CREDENTIALS, 400)
  }
}

exports.verifyToken = async req => {
  const token = getToken(req)
  const dtoken = decode(token)

  console.log(12, dtoken)
  const pubKey = await getPublicKey(
    (dtoken.header && dtoken.header.kid) || null
  )
  console.log(12)
  verify(token, pubKey)

  return dtoken.payload
}
