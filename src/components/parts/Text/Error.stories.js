import { withKnobs, text } from '@storybook/addon-knobs'
import Error from './Error.svelte'

export default {
  title: 'Text Error',
  component: Error,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Error,
  props: {
    message: text('message', '30文字までです'),
  },
})
