import { withKnobs, text, select } from '@storybook/addon-knobs'
import Summary from './Summary.svelte'
import BreadType from '../../../const/bread-type'

export default {
  title: 'Bread/Summary',
  component: Summary,
  decorators: [withKnobs],
}

export const 新規_６文字 = () => ({
  Component: Summary,
  props: {
    title: text('title', '６文字６文字'),
    type: select('type', BreadType, BreadType.NEW),
    userId: text('userId', 'dummy-id__0123456789'),
    nanoId: text('nanoId', 'dummy-nano-id'),
  },
})

export const お気に入り_１文字 = () => ({
  Component: Summary,
  props: {
    title: text('title', '魚'),
    type: select('type', BreadType, BreadType.FAVORITES),
    userId: text('userId', 'a'),
    nanoId: text('nanoId', 'dummy-nano-id'),
  },
})

export const 自作_３０文字 = () => ({
  Component: Summary,
  props: {
    title: text(
      'title',
      '最大文字数＿３０文字最大文字数＿３０文字最大文字数＿３０文字'
    ),
    type: select('type', BreadType, BreadType.SELF_MADE),
    userId: text('userId', 'self_made'),
    nanoId: text('nanoId', 'dummy-nano-id'),
  },
})

export const キャッシュ = () => ({
  Component: Summary,
  props: {
    title: text('title', 'キャッシュ'),
    type: select('type', BreadType, BreadType.CACHE),
    userId: text('userId', 'downloaded'),
    nanoId: text('nanoId', 'dummy-nano-id'),
  },
})
