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
    subText: text('subText', ''),
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
    subText: text('subText', ''),
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
    subText: text('subText', ''),
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
    subText: text('subText', '(Escape)'),
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
    subText: text('subText', '(Delete)'),
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
    subText: text('subText', '(Ctrl + Enter)'),
    positive: true,
    disabled: boolean('disabled', false),
  },
  on: {
    click: console.info,
  },
})
