import { push } from 'svelte-spa-router'

export function moveBreadDetail(e) {
  const nanoId = e.detail.nanoId
  push(`/breads/detail/${nanoId}`)
}
