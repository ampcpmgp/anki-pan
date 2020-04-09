const Validation = require('../../../const/validation')
const MAX_VALUE = 30

exports.validate = value => {
  if (value.length === 0) {
    return Validation.EMPTY
  }

  if (value.length > 30) {
    return Validation.COUNT_OVER
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
      return `最大文字数は${MAX_VALUE}文字です`
    default:
      console.error(`result: ${result}`)
  }
}