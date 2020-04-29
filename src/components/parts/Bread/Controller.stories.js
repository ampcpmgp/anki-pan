import { withKnobs, boolean } from '@storybook/addon-knobs'
import Controller from './Controller.svelte'

export default {
  title: 'Bread/Controller',
  component: Controller,
  decorators: [withKnobs],
}

export const 標準 = () => ({
  Component: Controller,
  props: {
    disabledBack: boolean('disabledBack', false),
    disabledSkipBack: boolean('disabledSkipBack', true),
    disabledPlay: boolean('disabledPlay', false),
    disabledNext: boolean('disabledNext', false),
    isPlaying: boolean('isPlaying', false),
  },
  on: {
    back: console.info,
    play: console.info,
    next: console.info,
    stop: console.info,
  },
})

export const 再生中 = () => ({
  Component: Controller,
  props: {
    disabledBack: boolean('disabledBack', false),
    disabledSkipBack: boolean('disabledSkipBack', false),
    disabledPlay: boolean('disabledPlay', false),
    disabledNext: boolean('disabledNext', false),
    isPlaying: boolean('isPlaying', true),
  },
  on: {
    back: console.info,
    skipBack: console.info,
    play: console.info,
    next: console.info,
    pause: console.info,
  },
})
