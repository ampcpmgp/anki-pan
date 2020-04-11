import mock from 'am-mocktimes'
import fetchMock from 'fetch-mock'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as db from '../src/utils/db'
import * as auth from '../src/states/auth'
import * as user from '../src/states/user'
import * as userInput from '../src/states/user-input'
import * as userBread from '../src/states/user-bread'
import * as alert from '../src/states/alert'
import * as images from '../src/images/stories'
import bread from './dummy-data/bread'

fetchMock.mock('/api/user/account/get', {})
fetchMock.mock('/api/user/bread/post', {})
fetchMock.mock('/api/user/bread/get?nanoId=no-bread-nanoid', bread)
fetchMock.mock('/api/breads/summary/get', {
  data: [],
})

mock({
  sleep,
  db,
  auth,
  user,
  userInput,
  userBread,
  alert,

  page(name) {
    replace(name)
  },

  setBreadsImage() {
    userInput.breadNew.image.set(images.earthBig)
  },

  async setBreadOnDB() {
    await db.setBread(bread)
  },
})
