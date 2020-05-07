import test from 'ava'
import * as title from './title'
const Validation = require('../../../const/validation')

test('全角文字数エラー', async t => {
  const result = title.validate(
    '０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９１'
  )

  t.is(result, Validation.COUNT_ZENKAKU_OVER)
})
