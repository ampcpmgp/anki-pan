import test from 'ava'
import * as answerName from './answer-name'
const Validation = require('../../../const/validation')

test('全角文字数エラー', async t => {
  const result = answerName.validate(
    '０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９１'
  )

  t.is(result, Validation.COUNT_ZENKAKU_OVER)
})
