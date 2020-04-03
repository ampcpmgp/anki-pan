const is = require('is_js')
const Validation = require('../../../const/validation')
const MAX_LENGTH = 2000

exports.validate = value => {
  if (value.length > MAX_LENGTH) {
    return Validation.COUNT_OVER
  }

  if (is.not.url(value)) {
    return Validation.MALFORMED
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
      return ''
    case Validation.COUNT_OVER:
      return `最大文字数は${MAX_LENGTH}文字です`
    case Validation.MALFORMED:
      return `URLの形式が誤っています`
    default:
      console.error(`result: ${result}`)
  }
}
