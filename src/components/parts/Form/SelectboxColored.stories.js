import { withKnobs, select, color } from '@storybook/addon-knobs'
import SelectboxColored from './SelectboxColored.svelte'

export default {
  title: 'Form/SelectboxColored',
  component: SelectboxColored,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: SelectboxColored,
  props: {
    label: '選択',
    options: [
      {
        value: 'value 1',
        name: 'name 1',
        color: color('color', '#ccc'),
      },
      {
        value: 'value 2',
        name: 'name 2',
        color: '',
      },
      {
        value: 'value 3',
        name: 'name 3',
        color: color('color', '#ccc'),
      },
    ],
    value: select(
      'value',
      {
        'value 1': 'value 1',
        'value 2': 'value 2',
        'value 3': 'value 3',
      },
      'value 1'
    ),
  },
})
