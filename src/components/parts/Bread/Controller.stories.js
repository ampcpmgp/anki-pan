import { withKnobs, boolean } from '@storybook/addon-knobs'
import Controller from './Controller.svelte'

export default {
  title: 'Bread/Controller',
  component: Controller,
  decorators: [withKnobs],
}

export const 再生前 = () => ({
  Component: Controller,
  props: {
    disabledPrev: boolean('disabledPrev', false),
    disabledSkipBack: boolean('disabledSkipBack', true),
    disabledPlay: boolean('disabledPlay', false),
    disabledNext: boolean('disabledNext', false),
    isPlaying: boolean('isPlaying', false),
  },
  on: {
    prev: console.info,
    skipBack: console.info,
    skipForward: console.info,
    play: console.info,
    next: console.info,
    pause: console.info,
  },
})

export const 再生中 = () => ({
  Component: Controller,
  props: {
    disabledPrev: boolean('disabledPrev', false),
    disabledSkipBack: boolean('disabledSkipBack', false),
    disabledPlay: boolean('disabledPlay', false),
    disabledNext: boolean('disabledNext', false),
    isPlaying: boolean('isPlaying', true),
  },
  on: {
    prev: console.info,
    skipBack: console.info,
    skipForward: console.info,
    play: console.info,
    next: console.info,
    pause: console.info,
  },
})
