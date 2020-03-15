import { withKnobs, boolean } from '@storybook/addon-knobs'
import Image from './Image.svelte'
import earthMini from '../../../images/stories/240px-The_Earth_seen_from_Apollo_17.jpg'
import earthBig from '../../../images/stories/1023px-The_Earth_seen_from_Apollo_17.jpg'
import 都道府県svg from '../../../images/stories/Prefectures_of_Japan_nallow_gray_labeled_Jp.svg'
import landScapeMini from '../../../images/stories/Rheinfall_Panorama_revised_mini.jpg'
import landScapeBig from '../../../images/stories/Rheinfall_Panorama_revised_big.jpg'

export default {
  title: 'Bread Image',
  component: Image,
  decorators: [withKnobs],
}

export const 画像未設定 = () => ({
  Component: Image,
  props: {
    imgSrc: '',
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const 都道府県 = () => ({
  Component: Image,
  props: {
    imgSrc: 都道府県svg,
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const 地球小型200 = () => ({
  Component: Image,
  props: {
    imgSrc: earthMini,
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const 地球大型1023 = () => ({
  Component: Image,
  props: {
    imgSrc: earthBig,
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const landScape小型 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeMini,
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const landScape大型 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeBig,
    editable: boolean('editable', true),
  },
  on: {
    generateRectangle: console.info,
  },
})

export const 編集不可 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeBig,
    editable: boolean('editable', false),
  },
  on: {
    generateRectangle: console.info,
  },
})
