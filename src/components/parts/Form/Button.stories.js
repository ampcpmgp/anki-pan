import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Button from './Button.svelte'

export default {
  title: 'Form/Button',
  component: Button,
  decorators: [withKnobs],
}

export const Hot = () => ({
  Component: Button,
  props: {
    text: text('text', 'ログイン'),
    hot: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})

export const Calm = () => ({
  Component: Button,
  props: {
    text: text('text', 'ログアウト'),
    calm: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})

export const Active = () => ({
  Component: Button,
  props: {
    text: text('text', 'パンを焼く'),
    active: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})

export const Passive = () => ({
  Component: Button,
  props: {
    text: text('text', 'キャンセル'),
    passive: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})

export const Negative = () => ({
  Component: Button,
  props: {
    text: text('text', '削除'),
    negative: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})

export const Positive = () => ({
  Component: Button,
  props: {
    text: text('text', 'OK'),
    positive: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})
