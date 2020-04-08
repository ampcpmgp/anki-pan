const Validation = require('../../../const/validation')
const MAX_LENGTH = 1000

exports.validate = value => {
  if (value.length > MAX_LENGTH) {
    return Validation.ARRAY_LENGTH_OVER
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
      return `最大回答数は${MAX_LENGTH}個です`
    default:
      console.error(`result: ${result}`)
  }
}
