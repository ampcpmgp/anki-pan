import { withKnobs, text } from '@storybook/addon-knobs'
import Answer from './Answer.svelte'

export default {
  title: 'Bread/Answer',
  component: Answer,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Answer,
  props: {
    name: text('name', '大脳基底核'),
    reading: text('reading', ''),
  },
  on: {
    ok: console.info,
    cancel: console.info,
  },
})
