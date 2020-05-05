import { withKnobs, number } from '@storybook/addon-knobs'
import ScrollPosMock from './ScrollPosMock.svelte'

export default {
  title: 'Etc/ScrollPosMock',
  component: ScrollPosMock,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: ScrollPosMock,
  props: {
    scrollY: number('scrollY', 200),
  },
})
