import { withKnobs, boolean, number } from '@storybook/addon-knobs'
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

const answers = [
  {
    left: 0.2,
    top: 0.25,
    width: 0.08,
    height: 0.05,
    name: '北海道',
    reading: 'ほっかいどー',
  },
  {
    left: 0.72,
    top: 0.641,
    width: 0.07,
    height: 0.029,
    name: '秋田県',
    reading: '',
  },
]

export const 画像未設定 = () => ({
  Component: Image,
  props: {
    imgSrc: '',
    editable: boolean('editable', true),
    answers: [],
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const 地球小型200 = () => ({
  Component: Image,
  props: {
    imgSrc: earthMini,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const 地球大型1023 = () => ({
  Component: Image,
  props: {
    imgSrc: earthBig,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const landScape小型 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeMini,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const landScape大型 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeBig,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const 編集不可 = () => ({
  Component: Image,
  props: {
    imgSrc: landScapeBig,
    editable: boolean('editable', false),
    answers,
    playbackIndex: number('playbackIndex', -1),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})

export const 都道府県_再生 = () => ({
  Component: Image,
  props: {
    imgSrc: 都道府県svg,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', 0),
  },
  on: {
    generateRectangle: console.info,
    next: console.info,
    end: console.info,
  },
})
