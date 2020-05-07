import test from 'ava'
import * as reading from './reading'
const Validation = require('../../../const/validation')

test('全角文字数エラー', async t => {
  const result = reading.validate(
    '０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０'
  )

  t.is(result, Validation.COUNT_ZENKAKU_OVER)
})
