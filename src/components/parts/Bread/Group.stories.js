import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import Group from './Group.svelte'
import BreadType from '../../../const/bread-type'
import nanoid from 'nanoid'

const items = Array.from({ length: 10 }).map((_, i) => ({
  title: `細胞の秘密 ${i}`,
  userId: 'ampcpmgp',
  id: nanoid(),
}))

export default {
  title: 'Bread Group',
  component: Group,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.NEW),
    items,
    isLast: boolean('isLast', false),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})
