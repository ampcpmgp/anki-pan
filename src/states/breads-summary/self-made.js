import { get, writable, derived } from 'svelte/store'
import { loginUser } from '../../utils/api'
import { getAuthorization } from '../auth'

export const items = writable([])
export const after = writable([])
export const fetched = writable(false)
export const existsAfter = derived(after, $after => $after.length > 0)
export const afterInfo = derived(after, $after => ({
  ts: $after[0],
  ref: $after[1]['@ref'].id,
}))

export function reset() {
  items.set([])
  after.set([])
  fetched.set(false)
}

export async function fetch() {
  if (get(fetched)) return

  try {
    const Authorization = await getAuthorization()
    const response = await loginUser.get({
      endpoint: 'user/breads/summary/get',
      Authorization,
    })

    if (response.status === 503) {
      throw new Error('取得エラー')
    }

    const result = await response.json()

    items.set(result.data)
    after.set(result.after || [])
    fetched.set(true)
  } catch (error) {
    console.info(error)
  }
}

export async function reload() {
  fetched.set(false)
  await fetch()
}

export async function fetchReadMore() {
  if (!get(existsAfter)) {
    return
  }

  const $afterInfo = get(afterInfo)

  try {
    const Authorization = await getAuthorization()
    const response = await loginUser.get({
      endpoint: 'user/breads/summary/read-more/get',
      Authorization,
      params: $afterInfo,
    })

    if (response.status === 503) {
      throw new Error('取得エラー')
    }

    const result = await response.json()

    items.update($items => [...$items, ...result.data])
    after.set(result.after || [])
  } catch (error) {
    console.info(error)
  }
}