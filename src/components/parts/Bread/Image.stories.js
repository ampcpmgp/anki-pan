import { withKnobs } from '@storybook/addon-knobs'
import Image from './Image.svelte'
import earthMini from '../../../images/stories/240px-The_Earth_seen_from_Apollo_17.jpg'
import 都道府県svg from '../../../images/stories/Prefectures_of_Japan_nallow_gray_labeled_Jp.svg'

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

export const 都道府県 = () => ({
  Component: Image,
  props: {
    imgSrc: 都道府県svg,
  },
})

export const 地球小型200x200 = () => ({
  Component: Image,
  props: {
    imgSrc: earthMini,
  },
})
