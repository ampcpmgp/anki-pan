import { withKnobs, text, number } from '@storybook/addon-knobs'
import Number from './Number.svelte'

export default {
  title: 'Form/Number',
  component: Number,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Number,
  props: {
    label: text('label', '出典元URL'),
    value: number('value', 0),
    errMsg: text('errMsg', ''),
  },
})

export const Error = () => ({
  Component: Number,
  props: {
    label: text('label', '出典元URL'),
    value: number('value', -1),
    errMsg: text('errMsg', '0以上を指定してください'),
  },
})
