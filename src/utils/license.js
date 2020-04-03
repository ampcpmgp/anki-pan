const License = require('../../const/license')

export function getList() {
  return Object.keys(License).map(key => ({
    key,
    value: License[key],
  }))
}
