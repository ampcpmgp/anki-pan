import { withKnobs, text } from '@storybook/addon-knobs'
import Summary from './Summary.svelte'

export default {
  title: 'Bread Summary',
  component: Summary,
  decorators: [withKnobs],
}

export const MaxWord = () => ({
  Component: Summary,
  props: {
    title: text(
      'title',
      '最大文字数＿３０文字最大文字数＿３０文字最大文字数＿３０文字'
    ),
    userId: text('userId', 'dummy-id__0123456789'),
    breadId: text('breadId', 'dummy-bread-id'),
  },
  on: {
    click: e => console.info(e.detail),
  },
})

export const MinWord = () => ({
  Component: Summary,
  props: {
    title: text('title', '魚'),
    userId: text('userId', 'a'),
    breadId: text('breadId', 'dummy-bread-id'),
  },
  on: {
    click: e => console.info(e.detail),
  },
})
