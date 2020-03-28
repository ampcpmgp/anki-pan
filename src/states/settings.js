import { writable } from 'svelte/store'

export const isOpen = writable(false)

export function openModal() {
  isOpen.set(true)
}

export function closeModal() {
  isOpen.set(false)
}
