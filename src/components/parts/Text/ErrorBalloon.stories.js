import { withKnobs, text } from '@storybook/addon-knobs'
import ErrorBalloon from './ErrorBalloon.svelte'

export default {
  title: 'Text/ErrorBalloon',
  component: ErrorBalloon,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: ErrorBalloon,
  props: {
    message: text('message', '30文字までです'),
  },
})
