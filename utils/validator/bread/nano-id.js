const Validation = require('../../../const/validation')
const MAX_VALUE = 30

exports.validate = value => {
  if (typeof value !== 'string') {
    return Validation.MALFORMED
  }

  if (value.length > MAX_VALUE) {
    return Validation.COUNT_OVER
  }

  return Validation.NO_ERROR
}

exports.isValid = value => {
  return exports.validate(value) === Validation.NO_ERROR
}
