import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import Group from './Group.svelte'
import BreadType from '../../../const/bread-type'
import nanoid from 'nanoid'

function getItems(num) {
  return Array.from({ length: num }).map((_, i) => ({
    title: `細胞の秘密 ${i}`,
    userId: 'ampcpmgp',
    nanoId: nanoid(),
  }))
}

export default {
  title: 'Bread Group',
  component: Group,
  decorators: [withKnobs],
}

export const パン10個_最新 = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.NEW),
    items: getItems(10),
    showReadMore: boolean('showReadMore', true),
    description: text('description', ''),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})

export const パン3個_お気に入り = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.FAVORITES),
    items: getItems(3),
    showReadMore: boolean('showReadMore', true),
    description: text('description', ''),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})

export const パン0個_自作 = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.FAVORITES),
    items: getItems(0),
    showReadMore: boolean('showReadMore', false),
    description: text('description', ''),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})

export const パン5個_キャッシュ = () => ({
  Component: Group,
  props: {
    type: select('type', BreadType, BreadType.CACHE),
    items: getItems(5),
    showReadMore: boolean('showReadMore', true),
    description: text('description', '最終閲覧から30日後に削除されます'),
  },
  on: {
    click: e => console.info(e.detail),
    readMore: e => console.info(e.detail),
  },
})
