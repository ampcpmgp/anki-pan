import { withKnobs } from '@storybook/addon-knobs'
import Controller from './Controller.svelte'

export default {
  title: 'Bread/Controller',
  component: Controller,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Controller,
  on: {
    back: console.info,
    play: console.info,
    next: console.info,
  },
})
