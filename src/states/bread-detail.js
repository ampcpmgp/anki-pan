import { writable, get, derived } from 'svelte/store'
import { guestUser, loginUser } from '../utils/api'
import * as db from '../utils/db'
import FromWhere from '../const/from-where'
import { isAuthenticated, getAuthorization } from './auth'

export const isHeart = writable(false)
export const errMsg = writable('')
export const bread = writable({})
export const fromWhere = writable(FromWhere.UNKNOWN)
export const hasBread = derived(bread, $bread => Object.keys($bread).length > 0)

export async function fetchFromDb(nanoId) {
  const breadFromDb = await db.getBread(nanoId)

  if (breadFromDb) {
    bread.set(breadFromDb)
  }
}

export async function fetchFromServer(nanoId) {
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

    bread.set(data)

    // TODO: 削除
    return data
  } catch (error) {
    errMsg.set('その他エラー')
  }
}

export async function fetch(nanoId) {
  bread.set({})
  fromWhere.set(FromWhere.UNKNOWN)
  await fetchFromDb(nanoId)

  if (get(hasBread)) {
    fromWhere.set(FromWhere.IDB)
    return
  }

  await fetchFromServer(nanoId)

  if (get(hasBread)) {
    fromWhere.set(FromWhere.SERVER)
  }
}

export async function fetchHeart() {
  isHeart
}
