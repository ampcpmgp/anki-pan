import { withKnobs } from '@storybook/addon-knobs'
import Editor from './Editor.svelte'

export default {
  title: 'Editor',
  component: Editor,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Editor,
  props: { text: 'dummy-text' },
})
