import { withKnobs, select } from '@storybook/addon-knobs'
import Selectbox from './Selectbox.svelte'
import License from '../../../../const/license'
import { getList } from '../../../utils/license'

export default {
  title: 'Form/Selectbox',
  component: Selectbox,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Selectbox,
  props: {
    label: 'ライセンス',
    options: getList(),
    value: select('value', License, License.CC0),
  },
})
