import { withKnobs, text } from '@storybook/addon-knobs'
import Success from './Success.svelte'

export default {
  title: 'Text/Success',
  component: Success,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Success,
  props: {
    message: text('message', 'dummy-text'),
  },
})
