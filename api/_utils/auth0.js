const fetch = require('node-fetch')
const config = require('../../auth0')
const jwt = require('jsonwebtoken')
const jwksRsa = require('jwks-rsa')
const { ApiError } = require('./api-error')

exports.jwt = jwt

const client = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-3a2raq64.auth0.com/.well-known/jwks.json',
})

// https://auth0.com/docs/api/authentication#get-user-info
exports.getUserInfo = async function(req) {
  const url = `https://${config.domain}/userinfo`

  return fetch(url, {
    headers: {
      Authorization: req.headers.authorization,
    },
  })
}

// 参考URL: https://github.com/kt3k/buttons/blob/13381807df4793c677bbea2d9342759d3e6c5a6c/api/util/jwt.js
exports.token = req => {
  const auth = req.headers.authorization

  if (!auth) {
    throw new ApiError('No Authorization header', 400)
  }

  const [scheme, token] = auth.split(' ', 2)

  if (!scheme || !token || !/^Bearer$/i.test(scheme)) {
    throw new ApiError('Invalid Credentials', 400)
  }

  return token
}

exports.decode = token => {
  const decoded = jwt.decode(token, { complete: true })

  if (!decoded) {
    throw new ApiError('Invalid Token', 400)
  }

  return decoded
}

exports.publicKey = kid =>
  new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        return reject(err)
      }

      resolve(key.publicKey || key.rsaPublicKey)
    })
  })

exports.verify = (token, publicKey) => {
  try {
    jwt.verify(token, publicKey)
  } catch (e) {
    console.info(e)
    throw new ApiError('Invalid Token', 400)
  }
}

/**
 * Verifies the token and returns the token payload (= the user info)
 */
exports.verifyToken = async req => {
  const token = exports.token(req)
  const dtoken = exports.decode(token)

  if (!process.env.SKIP_JWT_VERIFY) {
    const pubKey = await exports.publicKey(dtoken.header.kid)
    exports.verify(token, pubKey)
  }

  return dtoken.payload // user
}
