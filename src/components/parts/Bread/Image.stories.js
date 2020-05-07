import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import Lang from '../../../../const/lang'
import earthMini from '../../../images/stories/240px-The_Earth_seen_from_Apollo_17.jpg'
import earthBig from '../../../images/stories/1023px-The_Earth_seen_from_Apollo_17.jpg'
import 都道府県svg from '../../../images/stories/Prefectures_of_Japan_nallow_gray_labeled_Jp.svg'
import landScapeMini from '../../../images/stories/Rheinfall_Panorama_revised_mini.jpg'
import landScapeBig from '../../../images/stories/Rheinfall_Panorama_revised_big.jpg'
import Image from './Image.svelte'

export default {
  title: 'Bread/Image',
  component: Image,
  decorators: [withKnobs],
}

const answers = [
  {
    left: 0.2,
    top: 0.25,
    width: 0.08,
    height: 0.07,
    name: '北海道',
    reading: 'ほっかいどー',
    lang: Lang.JA_JP,
  },
  {
    left: 0.72,
    top: 0.641,
    width: 0.07,
    height: 0.029,
    name: '神奈川県',
    reading: '',
    lang: Lang.JA_JP,
  },
]

export const 画像未設定 = () => ({
  Component: Image,
  props: {
    image: '',
    editable: boolean('editable', true),
    answers: [],
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 地球小型200 = () => ({
  Component: Image,
  props: {
    image: earthMini,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 地球大型1023 = () => ({
  Component: Image,
  props: {
    image: earthBig,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 横長画像_小型 = () => ({
  Component: Image,
  props: {
    image: landScapeMini,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 400),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 横長画像_大型 = () => ({
  Component: Image,
  props: {
    image: landScapeBig,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 編集不可 = () => ({
  Component: Image,
  props: {
    image: landScapeBig,
    editable: boolean('editable', false),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 300),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})

export const 都道府県 = () => ({
  Component: Image,
  props: {
    image: 都道府県svg,
    editable: boolean('editable', true),
    answers,
    playbackIndex: number('playbackIndex', -1),
    isPause: boolean('isPause', true),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})
export const 都道府県_再生 = () => ({
  Component: Image,
  props: {
    image: 都道府県svg,
    editable: boolean('editable', false),
    answers,
    playbackIndex: number('playbackIndex', 0),
    isPause: boolean('isPause', false),
    height: number('height', 500),
  },
  on: {
    answerUpdate: e => console.info(e.detail),
    answerCreate: e => console.info(e.detail),
    answerDelete: e => console.info(e.detail),
    next: console.info,
    end: console.info,
  },
})
