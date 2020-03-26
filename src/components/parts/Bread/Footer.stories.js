import { withKnobs, text, select } from '@storybook/addon-knobs'
import Footer from './Footer.svelte'
import Lisense from '../../../../const/license'

export default {
  title: 'Bread/Footer',
  component: Footer,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Footer,
  props: {
    source: text('source', '//example.com'),
    license: select('license', Lisense, Lisense.CC0),
  },
})
