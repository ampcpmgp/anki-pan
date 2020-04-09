import { withKnobs, boolean } from '@storybook/addon-knobs'
import Controller from './Controller.svelte'

export default {
  title: 'Bread/Controller',
  component: Controller,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Controller,
  props: {
    noBack: boolean('noBack', false),
    noPlay: boolean('noPlay', false),
    noNext: boolean('noNext', false),
  },
  on: {
    back: console.info,
    play: console.info,
    next: console.info,
  },
})
