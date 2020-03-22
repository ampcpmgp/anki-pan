import { writable } from 'svelte/store'
import { loginUser } from '../utils/api'
import { getAuthorization } from './auth'

export async function fetchAccount() {
  try {
    const Authorization = await getAuthorization()

    const response = await loginUser.get({
      endpoint: 'user/account/get',
      Authorization,
    })

    if (response.status !== 200) {
      throw new Error('ユーザー情報取得エラー')
    }

    const result = await response.json()

    console.info(result)
  } catch (error) {
    console.info(error)
  }
}

export const account = writable({
  userName: '',
  breads: [],
})
