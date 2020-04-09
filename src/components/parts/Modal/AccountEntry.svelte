<script>
  import { createEventDispatcher } from 'svelte'
  import { getErrMsg, isValid } from '../../../../utils/validator/id'
  import Frame from './Frame'
  import Text from '../Form/Text'
  import Button from '../Form/Button'
  import Alert from '../Text/Alert'

  export let value = ''
  export let connecting = false
  export let errMsg = ''
  const dispatch = createEventDispatcher()
  $: idErrMsg = value && getErrMsg(value)
  $: disabledRegister = !isValid(value) || connecting

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

  .userid-wrapper {
    z-index: 1;
  }

  .buttons {
    justify-self: end;
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }

  .alert {
    justify-self: end;
  }
</style>

<Frame>
  <div class="content">
    <div class="userid-wrapper">
      <Text label="ユーザーID" bind:value errMsg={idErrMsg} />
    </div>

    <div class="buttons">
      <Button
        disabled={connecting}
        text="キャンセル"
        passive
        on:click={onCancel} />
      <Button
        disabled={disabledRegister}
        text="登録"
        active
        on:click={onRegister} />
    </div>

    <div class="alert">
      <Alert message={errMsg} />
    </div>
  </div>
</Frame>
