import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import AccountEntry from './AccountEntry.svelte'

export default {
  title: 'Modal/AccountEntry',
  component: AccountEntry,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: AccountEntry,
  props: {
    value: text('value', 'dummy-id'),
    connecting: boolean('connecting', false),
    errMsg: text('errMsg', '通信エラー'),
  },
  on: {
    cancel: console.info,
    register: e => console.info(e.detail),
  },
})
