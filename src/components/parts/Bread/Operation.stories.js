import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { default as FromWhere } from '../../../const/from-where'
import Operation from './Operation.svelte'

export default {
  title: 'Bread/Operation',
  component: Operation,
  decorators: [withKnobs],
}

export const 両方有り_キャッシュ = () => ({
  Component: Operation,
  props: {
    visibleFavorite: boolean('visibleFavorite', true),
    isFavorite: boolean('isFavorite', false),
    disabledFavorite: boolean('disabledFavorite', false),
    disabledRefresh: boolean('disabledRefresh', false),
    fromWhere: select('fromWhere', FromWhere, FromWhere.IDB),
  },
  on: {
    refresh: console.info,
    favorite: console.info,
  },
})

export const 両方有り_最新 = () => ({
  Component: Operation,
  props: {
    visibleFavorite: boolean('visibleFavorite', true),
    isFavorite: boolean('isFavorite', false),
    disabledFavorite: boolean('disabledFavorite', false),
    disabledRefresh: boolean('disabledRefresh', true),
    fromWhere: select('fromWhere', FromWhere, FromWhere.SERVER),
  },
  on: {
    refresh: console.info,
    favorite: console.info,
  },
})

export const リロードのみ_キャッシュ = () => ({
  Component: Operation,
  props: {
    visibleFavorite: boolean('visibleFavorite', false),
    isFavorite: boolean('isFavorite', false),
    disabledFavorite: boolean('disabledFavorite', false),
    disabledRefresh: boolean('disabledRefresh', false),
    fromWhere: select('fromWhere', FromWhere, FromWhere.IDB),
  },
  on: {
    refresh: console.info,
    favorite: console.info,
  },
})
