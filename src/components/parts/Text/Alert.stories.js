import { withKnobs, text } from '@storybook/addon-knobs'
import Alert from './Alert.svelte'

export default {
  title: 'Text/Alert',
  component: Alert,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Alert,
  props: {
    message: text('message', '通信エラーです'),
  },
})
