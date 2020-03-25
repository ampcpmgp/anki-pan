import { withKnobs, text } from '@storybook/addon-knobs'
import AccountEntry from './AccountEntry.svelte'

export default {
  title: 'Modal AccountEntry',
  component: AccountEntry,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: AccountEntry,
  props: {
    message: text('message', 'dummy-text'),
  },
})
