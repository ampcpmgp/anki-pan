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

    const data = await response.json()

    return data
  } catch (error) {
    errMsg.set('通信エラー')
  }
}
