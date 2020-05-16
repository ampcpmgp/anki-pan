import { writable } from 'svelte/store'
import { loginUser } from '../utils/api'
import { getRawIdToken } from './auth'

export const bakedErrMsg = writable('')
export const updatedErrMsg = writable('')
export const removedErrMsg = writable('')

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

    const Authorization = await getRawIdToken()

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

    const { nanoId } = await response.json()

    return nanoId
  } catch (error) {
    bakedErrMsg.set('その他エラー')
  }
}

export async function update({
  nanoId,
  title,
  answers,
  isPublic,
  source,
  license,
}) {
  try {
    updatedErrMsg.set('')

    const Authorization = await getRawIdToken()

    const response = await loginUser.put({
      endpoint: 'user/bread/put',
      Authorization,
      data: {
        nanoId,
        title,
        answers,
        isPublic,
        source,
        license,
      },
    })

    if (response.status === 400) {
      updatedErrMsg.set('入力エラー')
      return
    }

    if (response.status === 503) {
      updatedErrMsg.set('サーバーエラー')
      return
    }

    if (response.status === 404) {
      updatedErrMsg.set('該当のパンが見つかりません')
      return
    }

    updatedErrMsg.set('')
  } catch (error) {
    updatedErrMsg.set('その他エラー')
  }
}

export async function remove(nanoId) {
  try {
    removedErrMsg.set('')

    const Authorization = await getRawIdToken()

    const response = await loginUser.delete({
      endpoint: 'user/bread/delete',
      Authorization,
      data: {
        nanoId,
      },
    })

    if (response.status === 503) {
      removedErrMsg.set('サーバーエラー')
      return
    }

    if (response.status === 404) {
      removedErrMsg.set('該当のパンが見つかりません')
      return
    }

    removedErrMsg.set('')
  } catch (error) {
    removedErrMsg.set('その他エラー')
  }
}
