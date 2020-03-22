import { withKnobs } from '@storybook/addon-knobs'
import Footer from './Footer.svelte'

export default {
  title: 'Footer',
  component: Footer,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Footer,
})
