const Provider = require('../const/provider')

exports.getSubInfo = subjectClaim => {
  const [provider, id] = subjectClaim.split('|')

  if (!provider || !id) {
    throw new Error(`provider: ${provider}, id: ${id}`)
  }

  if (!exports.isValidProvider(provider)) {
    throw new Error(`provider: ${provider}`)
  }

  return {
    provider,
    id,
  }
}

exports.isValidProvider = provider => {
  switch (provider) {
    case Provider.GITHUB:
      return true
    case Provider.TWITTER:
      return true
    case Provider.GOOGLE:
      return true
    default:
      return false
  }
}
