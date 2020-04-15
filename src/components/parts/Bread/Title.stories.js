import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Title from './Title.svelte'

export default {
  title: 'Bread/Title',
  component: Title,
  decorators: [withKnobs],
}

export const 編集可能_エラー有 = () => ({
  Component: Title,
  props: {
    value: text('value', ''),
    userId: text('userId', 'dummy-id__0123456789'),
    readonly: boolean('readonly', false),
    errMsg: text('errMsg', 'タイトルは30文字以内で入力してください。'),
  },
  on: {
    homeClick: console.info,
  },
})

export const 編集不可 = () => ({
  Component: Title,
  props: {
    value: text(
      'value',
      '最大文字数＿３０文字最大文字数＿３０文字最大文字数＿３０文字'
    ),
    userId: text('userId', 'dummy-id__0123456789'),
    readonly: boolean('readonly', true),
    errMsg: text('errMsg', ''),
  },
  on: {
    homeClick: console.info,
  },
})
