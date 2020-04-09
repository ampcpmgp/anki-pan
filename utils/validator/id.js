const Validation = require('../../const/validation')

exports.validate = value => {
  if (value.length === 0) {
    return Validation.EMPTY
  }

  if (value.length > 20) {
    return Validation.COUNT_OVER
  }

  if (!/^[a-z|0-9|\-|_]+$/g.test(value)) {
    return Validation.UNAVAILABLE_CHAR
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
      return '最大文字数は20文字です'
    case Validation.UNAVAILABLE_CHAR:
      return '使用可能文字は a~z 0~9 - _ です'
    default:
      console.error(`result: ${result}`)
  }
}
