import { writable } from 'svelte/store'
import { loginUser } from '../utils/api'
import { getAuthorization } from './auth'

export const nanoId = writable('')
export const id = writable('')
export const hasNoId = writable(false)
export const registrationErrMsg = writable('')

export async function fetchAccount() {
  try {
    const Authorization = await getAuthorization()

    const response = await loginUser.get({
      endpoint: 'user/account/get',
      Authorization,
    })

    if (response.status === 503) {
      throw new Error('ユーザー情報取得エラー')
    }

    if (response.status === 404) {
      hasNoId.set(true)

      return
    }

    const data = await response.json()

    nanoId.set(data.nanoId)
    id.set(data.id)
  } catch (error) {
    throw new Error('通信エラー')
  }
}

export async function register(id) {
  try {
    const Authorization = await getAuthorization()

    const response = await loginUser.post({
      endpoint: 'user/account/post',
      Authorization,
      data: {
        id,
      },
    })

    if (response.status === 503) {
      registrationErrMsg.set('サーバーエラー')
      return
    }

    if (response.status === 409) {
      registrationErrMsg.set('IDが使用されています')
      return
    }

    registrationErrMsg.set('')
    hasNoId.set(false)
  } catch (error) {
    registrationErrMsg.set('通信エラー')
  }
}
