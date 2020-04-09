import { withKnobs, text } from '@storybook/addon-knobs'
import Alert from './Alert.svelte'

export default {
  title: 'Alert',
  component: Alert,
  decorators: [withKnobs],
}

export const Success = () => ({
  Component: Alert,
  props: {
    message: text('message', 'dummy-text'),
    success: true,
  },
})
