import { withKnobs, text } from '@storybook/addon-knobs'
import Answer from './Answer.svelte'

export default {
  title: 'Bread/Answer',
  component: Answer,
  decorators: [withKnobs],
}

export const エラー無し = () => ({
  Component: Answer,
  props: {
    name: text('name', '大脳基底核'),
    reading: text('reading', ''),
  },
  on: {
    ok: console.info,
    cancel: console.info,
  },
})

export const エラー有り = () => ({
  Component: Answer,
  props: {
    name: text(
      'name',
      '３１文字３１文字３１文字３１文字３１文字３１文字３１文字３１文'
    ),
    reading: text('reading', ''),
  },
  on: {
    ok: console.info,
    cancel: console.info,
  },
})
