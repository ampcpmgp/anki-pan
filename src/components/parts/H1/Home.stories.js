import { withKnobs } from '@storybook/addon-knobs'
import Component from './Home.svelte'

export default {
  title: 'H1/Home',
  component: Component,
  decorators: [withKnobs],
}

export const Home = () => ({
  Component,

  props: {
    version: '1.0.0',
  },
})
