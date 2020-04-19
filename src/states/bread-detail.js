import { writable, get, derived } from 'svelte/store'
import { guestUser, loginUser } from '../utils/api'
import { isAuthenticated, getAuthorization } from './auth'

export const isHeart = writable(false)
export const errMsg = writable('')
export const bread = writable({})
export const hasBread = derived(bread, $bread => Object.keys($bread).length > 0)

export async function fetch(nanoId) {
  try {
    errMsg.set('')

    let response

    if (get(isAuthenticated)) {
      const Authorization = await getAuthorization()

      response = await loginUser.get({
        endpoint: 'user/bread/get',
        Authorization,
        params: {
          nanoId,
        },
      })
    } else {
      response = await guestUser.get('user/bread/get', {
        nanoId,
      })
    }

    if (response.status === 403) {
      errMsg.set('パン情報へのアクセスが禁止されています')
      return
    }

    if (response.status === 404) {
      errMsg.set('該当のパンが見つかりません')
      return
    }

    const data = await response.json()

    return data
  } catch (error) {
    errMsg.set('その他エラー')
  }
}

export async function fetchHeart() {
  isHeart
}
