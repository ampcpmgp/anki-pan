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
})

export const Calm = () => ({
  Component: Button,
  props: { text: text('text', 'ログアウト'), type: 'calm' },
})

export const Active = () => ({
  Component: Button,
  props: { text: text('text', 'パンを焼く'), type: 'active' },
})
