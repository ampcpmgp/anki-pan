import { withKnobs } from '@storybook/addon-knobs'
import Button from './Button.svelte'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Button,
  props: { text: 'dummy-text' },
})
