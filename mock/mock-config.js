import mock from 'am-mocktimes'
import fetchMock from 'fetch-mock'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'

fetchMock.mock('/api/users/account/get', {})

mock({
  sleep,

  page(name) {
    replace(name)
  },
})
