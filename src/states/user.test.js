import test from 'ava'
import { get } from 'svelte/store'
import * as user from './user'

test('account', t => {
  const account = get(user.account)

  t.deepEqual(account, {
    userName: '',
    breads: [],
  })
})
