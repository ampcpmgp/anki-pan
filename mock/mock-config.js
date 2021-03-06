import mock from 'am-mocktimes'
import fetchMock from 'fetch-mock'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as idb from '../src/utils/idb'
import * as auth from '../src/states/auth'
import * as user from '../src/states/user'
import * as userInput from '../src/states/user-input'
import * as userBread from '../src/states/user-bread'
import * as alert from '../src/states/alert'
import * as images from '../src/images/stories'
import * as dummyData from './dummy-data'

fetchMock.mock('/api/user/account/get', {})
fetchMock.mock('/api/user/bread/post', {})
fetchMock.mock('/api/user/bread/get?nanoId=no-bread-nanoid', dummyData.bread)
fetchMock.mock('/api/user/favorite/get?breadNanoId=has-bread-nanoid', {
  isExists: true,
  favorite: {
    userNanoId: 'dummy-user-nanoid',
    breadNanoId: 'has-bread-nanoid',
  },
})
fetchMock.mock('/api/breads-summary/latest/get', dummyData.summary)
fetchMock.mock(
  '/api/breads-summary/latest/get?ref=261756579953520129&ts=1585889377480000',
  dummyData.summaryNoAfter
)
fetchMock.mock('/api/breads-summary/favorites/get', dummyData.summaryNoAfter)
fetchMock.mock('/api/breads-summary/self-made/get', dummyData.summaryNoAfter)

mock({
  sleep,
  idb,
  auth,
  user,
  userInput,
  userBread,
  alert,

  page(name) {
    replace(name)
  },

  setCaches() {
    const breads = [...dummyData.summary.data, ...dummyData.summaryNoAfter.data]

    breads.forEach(bread => {
      idb.setBread(bread)
    })
  },

  setBreadImage() {
    userInput.breadNew.image.set(images.earthBig)
  },

  setNewBread() {
    userInput.breadNew.image.set(images.earthBig)
    userInput.breadNew.answers.set(dummyData.bread.answers)
  },

  async setBreadOnDB() {
    await idb.setBread(dummyData.bread)
  },
})
