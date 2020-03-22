import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import Group from './Group.svelte'
import BreadType from '../../../const/bread-type'
import nanoid from 'nanoid'

const items = Array.from({ length: 10 }).map((_, i) => ({
  title: `細胞の秘密 ${i}`,
  userId: 'ampcpmgp',
  nanoId: nanoid(),
}))

export default {
  title: 'Bread Group',
  component: Group,
  decorators: [withKnobs],
}

export const パン10個 = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.NEW),
    items,
    showReadMore: boolean('showReadMore', true),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})

export const パン0個 = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.FAVORITES),
    items: [],
    showReadMore: boolean('showReadMore', false),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})
