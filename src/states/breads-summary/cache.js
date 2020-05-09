import { get, writable, derived } from 'svelte/store'
import { SIZE } from '../../../const/pager'
import { getBreads } from '../../utils/idb'

export const offsetFromLast = writable(0)
export const items = writable([])
export const nextBreads = writable([])
export const showReadMore = derived(
  nextBreads,
  $nextBreads => $nextBreads.length > 0
)
export const fetched = writable(false)

export function reset() {
  items.set([])
  nextBreads.set([])
  fetched.set(false)
}

export async function fetch() {
  if (get(fetched)) return

  offsetFromLast.set(0)
  const breads = await getBreads(get(offsetFromLast))

  if (breads.length === 0) {
    return
  }

  items.update($items => [...$items, ...breads])
  offsetFromLast.update($offsetFromlast => $offsetFromlast + SIZE)
  nextBreads.set(await getBreads(get(offsetFromLast)))
  fetched.set(true)
}

export async function fetchReadMore() {
  let breads = []
  const $nextBreads = get(nextBreads)

  if ($nextBreads.length > 0) {
    breads = $nextBreads
    nextBreads.set([])
  } else {
    breads = await getBreads(get(offsetFromLast))
  }

  if (breads.length === 0) {
    return
  }

  items.update($items => [...$items, ...breads])
  offsetFromLast.update($offsetFromlast => $offsetFromlast + SIZE)
  nextBreads.set(await getBreads(get(offsetFromLast)))
  fetched.set(true)
}
