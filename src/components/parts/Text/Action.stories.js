import { withKnobs, text, color } from '@storybook/addon-knobs'
import Action from './Action.svelte'

export default {
  title: 'Text Action',
  component: Action,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Action,
  props: {
    text: text('text', 'もっと見る'),
    color: color('color', '#555'),
  },
  on: {
    click: console.info,
  },
})
