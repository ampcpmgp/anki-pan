import { withKnobs } from '@storybook/addon-knobs'
import Frame from './Frame.svelte'

export default {
  title: 'Modal Frame',
  component: Frame,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Frame,
  on: {
    click: console.info,
  },
})
