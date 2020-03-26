import { withKnobs, select } from '@storybook/addon-knobs'
import Selectbox from './Selectbox.svelte'
import License from '../../../../const/license'
import { objToArr } from '../../../utils/data'

export default {
  title: 'Form/Selectbox',
  component: Selectbox,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Selectbox,
  props: {
    options: objToArr(License),
    value: select('value', License, License.CC0),
  },
})
