import mock from 'am-mocktimes'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'

mock({
  sleep,

  page(name) {
    replace(name)
  },
})
