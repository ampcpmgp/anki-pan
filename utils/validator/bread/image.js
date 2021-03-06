const Validation = require('../../../const/validation')
exports.MAX_IMAGE_SIZE = 1024 * 1024 * 1 // 1MB

exports.validate = value => {
  if (value.length === 0) {
    return Validation.EMPTY
  }

  if (value.length > exports.MAX_IMAGE_SIZE) {
    return Validation.SIZE_OVER
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
    case Validation.SIZE_OVER:
      return `ファイルサイズは2MBまでにしてください🙇🙇‍♀`
    default:
      console.error(`result: ${result}`)
  }
}
