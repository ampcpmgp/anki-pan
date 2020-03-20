import mock from 'am-mocktimes'
import fetchMock from 'fetch-mock'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as auth from '../src/states/auth'

fetchMock.mock('/api/user/account/get', {})

mock({
  sleep,
  auth,

  page(name) {
    replace(name)
  },
})
