import test from 'ava'
import * as answerLang from './answer-lang'
const Validation = require('../../../const/validation')

test('対応外言語エラー', async t => {
  const result = answerLang.validate('JA_JP_dummy')

  t.is(result, Validation.MALFORMED)
})

test('エラーなし', async t => {
  const result = answerLang.validate('JA_JP')

  t.is(result, Validation.NO_ERROR)
})
