import { withKnobs, select } from '@storybook/addon-knobs'
import Home from './Home.svelte'
import BreadType from '../../../const/BreadType'

export default {
  title: 'H2 Home',
  component: Home,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Home,
  props: {
    type: select('type', BreadType, BreadType.NEW),
  },
})
