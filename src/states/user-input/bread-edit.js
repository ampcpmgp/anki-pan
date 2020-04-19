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
  title.set(get(bread).title)
  image.set(get(bread).image)
  answers.set(get(bread).answers)
  isPublic.set(get(bread).isPublic)
  source.set(get(bread).source)
  license.set(get(bread).license)
}
