import { withKnobs, text } from '@storybook/addon-knobs'
import Button from './Button.svelte'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

export const Hot = () => ({
  Component: Button,
  props: { text: text('text', 'ログイン'), type: 'hot' },
  on: {
    click: console.info,
  },
})

export const Calm = () => ({
  Component: Button,
  props: { text: text('text', 'ログアウト'), type: 'calm' },
  on: {
    click: console.info,
  },
})

export const Active = () => ({
  Component: Button,
  props: { text: text('text', 'パンを焼く'), type: 'active' },
  on: {
    click: console.info,
  },
})

export const Passive = () => ({
  Component: Button,
  props: { text: text('text', 'キャンセル'), type: 'passive' },
  on: {
    click: console.info,
  },
})
