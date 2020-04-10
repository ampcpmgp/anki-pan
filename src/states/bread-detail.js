import { writable } from 'svelte/store'
import { guestUser } from '../utils/api'

export const bread = writable({})
export const errMsg = writable('')

export async function get(nanoId) {
  try {
    errMsg.set('')

    const response = await guestUser.get('user/bread/get', {
      nanoId,
    })

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
