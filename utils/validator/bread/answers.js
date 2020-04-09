const Validation = require('../../../const/validation')
const MAX_LENGTH = 1000
const answerName = require('./answer-name')
const reading = require('./reading')

exports.validate = value => {
  if (value.length === 0) {
    return Validation.EMPTY
  }

  if (value.length > MAX_LENGTH) {
    return Validation.ARRAY_LENGTH_OVER
  }

  if (
    value.some(
      item =>
        Object.keys(item).length !== 6 ||
        !(item.left >= 0 && item.left <= 1) ||
        !(item.top >= 0 && item.top <= 1) ||
        !(item.width >= 0 && item.width <= 1) ||
        !(item.height >= 0 && item.height <= 1) ||
        !answerName.isValid(item.name) ||
        !reading.isValid(item.reading)
    )
  ) {
    return Validation.OTHER
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
    case Validation.ARRAY_LENGTH_OVER:
      return `最大回答数は${MAX_LENGTH}個です`
    case Validation.OTHER:
      return `配列の形式が不正です`
    default:
      console.error(`result: ${result}`)
  }
}
