import { withKnobs, text } from '@storybook/addon-knobs'
import Detail from './Detail.svelte'

export default {
  title: 'Bread Detail',
  component: Detail,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Detail,
  props: {
    title: text(
      'title',
      '最大文字数＿３０文字最大文字数＿３０文字最大文字数＿３０文字'
    ),
    userId: text('title', 'dummy-id__0123456789'),
    image: '',
    answers: '',
    source: '',
    license: '',
  },
})
