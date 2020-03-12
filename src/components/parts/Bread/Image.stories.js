import { withKnobs } from '@storybook/addon-knobs'
import Image from './Image.svelte'
import imgBase64 from '../.././../images/真核生物_細胞.js'

export default {
  title: 'Bread Image',
  component: Image,
  decorators: [withKnobs],
}

export const 画像未設定 = () => ({
  Component: Image,
  props: {
    imgBase64: '',
  },
})

export const 画像設定済み = () => ({
  Component: Image,
  props: {
    imgBase64,
  },
})
