import { writable } from 'svelte/store'
import { loginUser } from '../utils/api'
import { getAuthorization } from './auth'

export const bakedErrMsg = writable('')

export async function bake({
  title,
  image,
  answers,
  isPublic,
  source,
  license,
}) {
  try {
    bakedErrMsg.set('')

    const Authorization = await getAuthorization()

    const response = await loginUser.post({
      endpoint: 'user/bread/post',
      Authorization,
      data: {
        title,
        image,
        answers,
        isPublic,
        source,
        license,
      },
    })

    if (response.status === 400) {
      bakedErrMsg.set('入力エラー')
      return
    }

    if (response.status === 503) {
      bakedErrMsg.set('サーバーエラー')
      return
    }

    if (response.status === 404) {
      bakedErrMsg.set('該当のユーザーIDが見つかりません')
      return
    }

    bakedErrMsg.set('')
  } catch (error) {
    bakedErrMsg.set('通信エラー')
  }
}
