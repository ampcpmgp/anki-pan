import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import Answer from './Answer.svelte'

export default {
  title: 'Bread/Answer',
  component: Answer,
  decorators: [withKnobs],
}

export const エラー無し_上向き = () => ({
  Component: Answer,
  props: {
    name: text('name', '大脳基底核'),
    isEdit: boolean('isEdit', false),
    reading: text('reading', ''),
    index: number('index', 0),
    coord: {
      top: 0.2,
      left: 0.2,
      bottom: 0.4,
      right: 0.4,
    },
  },
  on: {
    cancel: console.info,
    create: console.info,
    delete: console.info,
    update: console.info,
  },
})

export const エラー無し_下向き = () => ({
  Component: Answer,
  props: {
    name: text('name', '大脳基底核'),
    isEdit: boolean('isEdit', false),
    reading: text('reading', ''),
    index: number('index', 0),
    coord: {
      top: 0.7,
      left: 0.2,
      bottom: 0.8,
      right: 0.4,
    },
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
    coord: {
      top: 0.2,
      left: 0.2,
      bottom: 0.4,
      right: 0.4,
    },
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
    coord: {
      top: 0.2,
      left: 0.2,
      bottom: 0.4,
      right: 0.4,
    },
  },
  on: {
    cancel: console.info,
    create: console.info,
    delete: console.info,
    update: console.info,
  },
})
