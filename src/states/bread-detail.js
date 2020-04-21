import { writable, get, derived } from 'svelte/store'
import { guestUser, loginUser } from '../utils/api'
import * as idb from '../utils/idb'
import FromWhere from '../const/from-where'
import { initP, isAuthenticated, getAuthorization } from './auth'

export const isFavorite = writable(false)
export const errMsg = writable('')
export const bread = writable({})
export const fromWhere = writable(FromWhere.UNKNOWN)
export const hasBread = derived(bread, $bread => Object.keys($bread).length > 0)

export async function fetchFromDb(nanoId) {
  const breadFromDb = await idb.getBread(nanoId)

  if (breadFromDb) {
    bread.set(breadFromDb)
    idb.setBread(breadFromDb)
    fromWhere.set(FromWhere.IDB)
  }
}

export async function fetchFromServer(nanoId) {
  try {
    errMsg.set('')

    let response

    await initP

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

    if (!data) {
      errMsg.set('パン取得に失敗しました')
      return
    }

    bread.set(data)
    idb.setBread(data)
    fromWhere.set(FromWhere.SERVER)
  } catch (error) {
    errMsg.set('その他エラー')
  }
}

export async function fetch(nanoId) {
  bread.set({})
  fromWhere.set(FromWhere.UNKNOWN)

  await fetchFromDb(nanoId)

  if (get(hasBread)) {
    return
  }

  await fetchFromServer(nanoId)
}

export async function fetchFavorite(breadNanoId) {
  try {
    await initP

    if (!get(isAuthenticated)) {
      throw new Error('not authenticated')
    }

    const Authorization = await getAuthorization()

    const response = await loginUser.get({
      endpoint: 'user/favorite/get',
      Authorization,
      params: {
        breadNanoId,
      },
    })

    if (response.status === 400) {
      throw new Error('Validation Error')
    }

    const data = await response.json()

    isFavorite.set(data.isExists)

    if (data.isExists) {
      idb.setFavorite(data.favorite)
    } else {
      idb.deleteFavorite(data.favorite)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function toggleFavorite(isFavorite) {
  await initP

  if (!get(isAuthenticated)) {
    return
  }

  const { nanoId } = get(bread)

  const Authorization = await getAuthorization()

  const response = await loginUser
    .post({
      endpoint: 'user/favorite/post',
      Authorization,
      data: {
        breadNanoId: nanoId,
        isFavorite,
      },
    })
    .catch(() => {
      throw new Error('その他エラー')
    })

  if (response.status === 503) {
    throw new Error('サーバーエラー')
  }

  if (response.status === 400) {
    throw new Error('入力エラー')
  }

  const data = await response.json()

  return data.isSuccess
}
