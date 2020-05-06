const Validation = require('../../../const/validation')
const MAX_VALUE = 60
const MAX_ZENKAKU_VALUE = 30
const hasZenkaku = /[^\x20-\x7E\xA1-\xDF]+/

exports.validate = value => {
  if (value.length === 0) {
    return Validation.EMPTY
  }

  if (value.length > MAX_VALUE) {
    return Validation.COUNT_OVER
  }

  if (hasZenkaku.test(value) && value.length > MAX_ZENKAKU_VALUE) {
    return Validation.COUNT_ZENKAKU_OVER
  }

  return Validation.NO_ERROR
}

exports.isValid = value => {
  return exports.validate(value) === Validation.NO_ERROR
}

exports.getErrMsg = value => {
  const result = exports.validate(value)

  switch (result) {
    case Validation.NO_ERROR:
    case Validation.EMPTY:
      return ''
    case Validation.COUNT_OVER:
      return `最大文字数は${MAX_ZENKAKU_VALUE}文字です`
    case Validation.COUNT_ZENKAKU_OVER:
      return `全角文字を含む場合、最大文字数は${MAX_ZENKAKU_VALUE}文字です`
    default:
      console.error(`result: ${result}`)
  }
}
