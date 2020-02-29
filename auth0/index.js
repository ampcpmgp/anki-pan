const local = require('./local.json')
const staging = require('./staging.json')
const production = require('./production.json')

function getConfig() {
  switch (process.env.NODE_ENV) {
    case 'local':
      return local
    case 'staging':
      return staging
    case 'production':
      return production
    default:
      console.info(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
  }
}

module.exports = getConfig()
