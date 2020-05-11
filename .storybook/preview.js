import { addParameters } from '@storybook/svelte'
import 'modern-css-reset'
import 'file-drop-element'

addParameters({
  backgrounds: [
    { name: 'grey', value: '#ccc' },
    { name: 'lightgreen', value: 'lightgreen' },
  ],
})
