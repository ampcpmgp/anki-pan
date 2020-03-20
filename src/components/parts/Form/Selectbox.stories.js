import { withKnobs, select } from '@storybook/addon-knobs'
import Selectbox from './Selectbox.svelte'
import License from '../../../../const/License'
import { objToArr } from '../../../utils/data'

export default {
  title: 'Form Selectbox',
  component: Selectbox,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Selectbox,
  props: {
    options: objToArr(License),
    selected: select('selected', License, License.CC0),
  },
  on: {
    change(e) {
      console.info(e.target.value)
    },
  },
})
