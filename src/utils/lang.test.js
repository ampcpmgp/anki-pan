import test from 'ava'
import { default as Lang } from '../../const/lang'
import * as lang from './lang'

test('名前取得', t => {
  const name = lang.getName(Lang.JA_JP)

  t.is('日本語', name)
})

test('リスト取得', t => {
  const list = lang.getList()

  t.is(list.length, 18)
})
