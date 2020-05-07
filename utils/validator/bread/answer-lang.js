const Validation = require('../../../const/validation')
const Lang = require('../../../const/lang')

exports.validate = value => {
  if (!Lang[value]) {
    return Validation.MALFORMED
  }

  return Validation.NO_ERROR
}

exports.isValid = value => {
  return exports.validate(value) === Validation.NO_ERROR
}
