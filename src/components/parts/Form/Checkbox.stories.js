import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Checkbox from './Checkbox.svelte'

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Checkbox,
  props: {
    label: text('label', 'dummy-text'),
    checked: boolean('checked', true),
  },
})
