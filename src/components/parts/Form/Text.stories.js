import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Text from './Text.svelte'

export default {
  title: 'Form/Text',
  component: Text,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Text,
  props: {
    label: text('label', '出典元URL'),
    value: text('value', ''),
    placeholder: text('placeholder', '入力してください'),
    errMsg: text('errMsg', ''),
    focused: boolean('focused', false),
  },
})

export const Error = () => ({
  Component: Text,
  props: {
    label: text('label', '出典元URL'),
    value: text('value', 'ABCDE'),
    placeholder: text('placeholder', '入力してください'),
    errMsg: text('errMsg', '使用可能文字は a~z 0~9 - _ です'),
    focused: boolean('focused', false),
  },
})

export const Focused = () => ({
  Component: Text,
  props: {
    label: text('label', '出典元URL'),
    value: text('value', ''),
    placeholder: text('placeholder', '入力してください'),
    errMsg: text('errMsg', ''),
    focused: boolean('focused', true),
  },
})
