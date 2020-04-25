import { writable, get } from 'svelte/store'
import License from '../../../const/license'
import { bread } from '../bread-detail'

export const title = writable('')
export const image = writable('')
export const answers = writable([])
export const isPublic = writable(false)
export const license = writable(License.OTHER)
export const source = writable('')

export function getBread(nanoId) {
  return {
    nanoId,
    title: get(title),
    image: get(image),
    answers: get(answers),
    isPublic: get(isPublic),
    source: get(source),
    license: get(license),
  }
}

export function updateFromBreadDetail() {
  const $bread = get(bread)

  title.set($bread.title)
  image.set($bread.image)
  answers.set($bread.answers)
  isPublic.set($bread.isPublic)
  source.set($bread.source)
  license.set($bread.license)
}
