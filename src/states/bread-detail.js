import * as svelte from 'svelte/store'
import { guestUser, loginUser } from '../utils/api'
import { isAuthenticated, getAuthorization } from './auth'

export const errMsg = svelte.writable('')

export async function get(nanoId) {
  try {
    errMsg.set('')

    let response

    if (svelte.get(isAuthenticated)) {
      const Authorization = await getAuthorization()

      response = await loginUser.get({
        endpoint: 'user/bread/get',
        Authorization,
        params: {
          nanoId: 'CXtzPvM2EUA30mbumnyid',
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
