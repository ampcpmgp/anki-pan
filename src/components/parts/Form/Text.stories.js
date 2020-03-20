import { withKnobs, text } from '@storybook/addon-knobs'
import Text from './Text.svelte'

export default {
  title: 'Form Text',
  component: Text,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Text,
  props: {
    label: text('label', '出典元URL'),
    value: text('value', ''),
    placeholder: text('placeholder', '入力してください'),
  },
  on: {
    input(e) {
      console.info(e.target.value)
    },
  },
})
