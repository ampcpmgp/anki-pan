import { push } from 'svelte-spa-router'

export function moveBreadDetail(e) {
  const id = e.detail.id
  push(`/breads/detail/${id}`)
}
