import { withKnobs } from '@storybook/addon-knobs'
import Component from './Main.svelte'

export default {
  title: 'Header',
  component: Component,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component,
})
