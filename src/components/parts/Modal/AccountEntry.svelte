<script>
  import { createEventDispatcher } from 'svelte'
  import { getErrMsg, isValid } from '../../../../utils/validator/id'
  import Frame from './Frame'
  import Text from '../Form/Text'
  import Button from '../Form/Button'

  export let value = ''
  export let connecting = false
  const dispatch = createEventDispatcher()
  $: errMsg = value && getErrMsg(value)
  $: disabledRegister = !value || !isValid(value) || connecting

  function onCancel() {
    dispatch('cancel')
  }

  function onRegister() {
    dispatch('register', value)
  }
</script>

<style>
  .content {
    padding: 40px;
    border-radius: 4px;
    background-color: white;

    display: grid;
    grid-row-gap: 12px;
  }

  .buttons {
    grid-row: 2 / span 1;
    justify-self: end;
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }
</style>

<Frame>
  <div class="content">
    <div class="buttons">
      <Button
        disabled={connecting}
        text="キャンセル"
        type="passive"
        on:click={onCancel} />
      <Button
        disabled={disabledRegister}
        text="登録"
        type="active"
        on:click={onRegister} />
    </div>

    <Text label="ユーザーID" bind:value {errMsg} />
  </div>
</Frame>
