import { withKnobs } from '@storybook/addon-knobs'
import Image from './Image.svelte'
import earthMini from '../../../images/stories/240px-The_Earth_seen_from_Apollo_17.jpg'

export default {
  title: 'Bread Image',
  component: Image,
  decorators: [withKnobs],
}

export const 画像未設定 = () => ({
  Component: Image,
  props: {
    imgSrc: '',
  },
})

export const 地球小型 = () => ({
  Component: Image,
  props: {
    imgSrc: earthMini,
  },
})
