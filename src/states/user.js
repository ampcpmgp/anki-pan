import { writable } from 'svelte/store'
import { loginUser } from '../utils/api'
import { getAuthorization } from './auth'

export async function fetchAccount() {
  try {
    const Authorization = await getAuthorization()

    const response = await loginUser.get({
      endpoint: 'users/account',
      Authorization,
    })

    if (response.status !== 200) {
      throw new Error('ユーザー情報取得エラー')
    }

    const result = await response.json()

    console.log(result)
  } catch (error) {
    console.info(error)
    alert(error)
  }
}

export const account = writable({
  displayName: '',
  posts: [],
})
