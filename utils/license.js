const License = require('../const/license')

exports.getName = function(license) {
  switch (license) {
    case License.CC_BY:
      return 'CC BY'
    case License.CC_BY_NC:
      return 'CC BY-NC'
    case License.CC_BY_ND:
      return 'CC BY-ND'
    case License.CC_BY_NC_ND:
      return 'CC BY-NC-ND'
    case License.CC_BY_SA:
      return 'CC BY-SA'
    case License.CC_BY_NC_SA:
      return 'CC BY-NC-SA'
    case License.CC0:
      return 'CC0'
    case License.PDM:
      return 'PDM'
    case License.PERMISSION:
      return '著作者の許可取得済み'
    case License.NO_LICENSE:
      return '無し'
    case License.OTHER:
      return '不明・その他'
    default:
      console.warn(`license: ${license}`)
  }
}
