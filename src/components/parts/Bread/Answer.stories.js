import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
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
    isEdit: boolean('isEdit', false),
    reading: text('reading', ''),
    index: number('index', 0),
  },
  on: {
    cancel: console.info,
    create: console.info,
    delete: console.info,
    update: console.info,
  },
})

export const エラー有り = () => ({
  Component: Answer,
  props: {
    name: text(
      'name',
      '３１文字３１文字３１文字３１文字３１文字３１文字３１文字３１文'
    ),
    isEdit: boolean('isEdit', false),
    reading: text('reading', ''),
    index: number('index', 0),
  },
  on: {
    cancel: console.info,
    create: console.info,
    delete: console.info,
    update: console.info,
  },
})

export const 編集可能 = () => ({
  Component: Answer,
  props: {
    name: text('name', '削除可能'),
    isEdit: boolean('isEdit', true),
    reading: text('reading', 'さくじょかのう'),
    index: number('index', 2),
  },
  on: {
    cancel: console.info,
    create: console.info,
    delete: console.info,
    update: console.info,
  },
})
