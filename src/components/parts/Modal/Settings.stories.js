import { withKnobs, text } from '@storybook/addon-knobs'
import Settings from './Settings.svelte'

export default {
  title: 'Modal/Settings',
  component: Settings,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Settings,
  props: {
    userId: text('userId', 'dummy-id'),
  },
  on: {
    click: console.info,
  },
})
