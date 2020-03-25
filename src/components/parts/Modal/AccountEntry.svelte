<script>
  import { getErrMsg } from '../../../../utils/validator/id'
  import Frame from './Frame'
  import Text from '../Form/Text'
  import Button from '../Button/Button'

  export let value = ''
  let errMsg = ''
  $: {
    errMsg = value && getErrMsg(value)
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
    justify-self: end;
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }
</style>

<Frame>
  <div class="content">
    <Text label="ユーザーID" bind:value {errMsg} />
    <div class="buttons">
      <Button text="キャンセル" type="passive" on:logout />
      <Button text="登録" type="active" />
    </div>
  </div>
</Frame>
