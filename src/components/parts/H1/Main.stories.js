import { withKnobs } from '@storybook/addon-knobs'
import Component from './Main.svelte'

export default {
  title: 'H1',
  component: Component,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component,
})
