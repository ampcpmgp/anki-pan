import { writable } from 'svelte/store'
import License from '../../../const/license'

export const title = writable('')
export const image = writable('')
export const answers = writable([])
export const isPublic = writable(false)
export const license = writable(License.OTHER)
export const source = writable('')
