import mock from 'am-mocktimes'
import fetchMock from 'fetch-mock'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as auth from '../src/states/auth'
import * as user from '../src/states/user'
import * as userInput from '../src/states/user-input'
import * as userBread from '../src/states/user-bread'
import * as images from '../src/images/stories'

fetchMock.mock('/api/user/account/get', {})
fetchMock.mock('/api/breads/summary/get', {})

mock({
  sleep,
  auth,
  user,
  userInput,
  userBread,

  page(name) {
    replace(name)
  },

  setBreadsImage() {
    userInput.breadNew.imgSrc.set(images.earthBig)
  },
})
