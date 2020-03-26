import { withKnobs, text } from '@storybook/addon-knobs'
import Setting from './Setting.svelte'

export default {
  title: 'Modal/Setting',
  component: Setting,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Setting,
  props: {
    message: text('message', 'dummy-text'),
  },
})
