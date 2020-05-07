import test from 'ava'
import '../_test-helper'
import { default as Lang } from '../../const/lang'
import * as lang from './lang'

test('名前取得', t => {
  const name = lang.getName(Lang.JA_JP)

  t.is('日本語', name)
})
