const Provider = require('../const/provider')

exports.getSubInfo = subjectClaim => {
  const [provider, id] = subjectClaim.split('|')

  if (!provider || !id) {
    throw new Error(`provider: ${provider}, id: ${id}`)
  }

  return {
    provider: exports.getProvider(provider),
    id,
  }
}

exports.getProvider = provider => {
  switch (provider) {
    case Provider.GITHUB:
      return Provider.GITHUB
    case Provider.TWITTER:
      return Provider.TWITTER
    case Provider.GOOGLE:
      return Provider.GOOGLE
    default:
      console.warn(`provider: ${provider}`)
  }
}
