import { withKnobs, text } from '@storybook/addon-knobs'
import Detail from './Detail.svelte'
import svg from '../../../images/stories/Prefectures_of_Japan_nallow_gray_labeled_Jp.svg'

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
    image: svg,
    answers: '',
    source:
      'https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Prefectures_of_Japan_nallow_gray_labeled_Jp.svg',
    license: 'CC0',
  },
})
