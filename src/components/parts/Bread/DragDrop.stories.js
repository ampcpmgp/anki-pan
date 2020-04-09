import { withKnobs } from '@storybook/addon-knobs'
import DragDrop from './DragDrop.svelte'

export default {
  title: 'Bread/DragDrop',
  component: DragDrop,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: DragDrop,
  on: {
    drop: e => console.info(e.detail),
  },
})
