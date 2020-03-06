import { withKnobs } from '@storybook/addon-knobs'
import Component from './Home.svelte'

export default {
  title: 'H1',
  component: Component,
  decorators: [withKnobs],
}

export const Home = () => ({
  Component,
})
