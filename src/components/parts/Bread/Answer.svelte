<script>
  import { createEventDispatcher } from 'svelte'
  import fether from 'feather-icons'
  import { slide } from 'svelte/transition'
  import { bread } from '../../../../utils/validator'
  import { speak } from '../../../utils/speech'
  import Text from '../Form/Text'
  import Button from '../Form/Button'
  import Number from '../Form/Number'

  export let name = ''
  export let reading = ''
  export let index = -1
  export let isEdit = false
  $: answserErrMsg = bread.answerName.getErrMsg(name)
  $: readingErrMsg = bread.reading.getErrMsg(reading)
  $: existsReading = !!reading
  $: disabledOk = !name || answserErrMsg || readingErrMsg

  const BALLOON_WIDTH = '30px'
  const dispatch = createEventDispatcher()

  const svg = {
    volume2: fether.icons['volume-2'].toSvg({
      width: '20px',
      height: '20px',
    }),
  }

  function onCancel() {
    dispatch('cancel')
  }
  function onDelete() {
    dispatch('delete')
  }
  function onCreate() {
    dispatch('create')
  }
  function onUpdate() {
    dispatch('update')
  }
</script>

<style>
  .answer {
    display: inline-grid;
    grid-template-columns: 1fr auto;
    grid-gap: 12px;
    width: 340px;
    padding: 30px;
    font-size: 0.9em;
    border: solid 1px green;
    border-radius: 4px;
    top: calc(var(--width) / 2);
    background-color: white;
  }

  .answer:before {
    content: '';
    position: absolute;
    top: calc(-1 * var(--width));
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid green;
  }

  .answer:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--width) + 1px);
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid #fff;
  }

  .name {
    z-index: 3;
    grid-row: 1;
    display: grid;
  }

  .reading {
    z-index: 2;
    grid-row: 2;
    display: grid;
  }

  .index {
    z-index: 1;
    grid-row: 3;
    width: 90px;
  }

  .speak {
    cursor: pointer;
    display: grid;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 0;
    appearance: none;
  }

  .buttons {
    justify-self: end;
    grid-row: 4;
    grid-column: span 2;
  }
</style>

<div
  class="answer"
  style="--width: {BALLOON_WIDTH};"
  transition:slide={{ duration: 100 }}>
  <div class="name">
    <Text
      label="答え"
      bind:value={name}
      placeholder=""
      errMsg={answserErrMsg} />
  </div>

  {#if !existsReading}
    <button type="button" class="speak name" on:click={() => speak(name)}>
      {@html svg.volume2}
    </button>
  {/if}

  <div class="reading">
    <Text
      label="読み"
      bind:value={reading}
      placeholder=""
      errMsg={readingErrMsg} />
  </div>

  {#if existsReading}
    <button type="button" class="speak reading" on:click={() => speak(reading)}>
      {@html svg.volume2}
    </button>
  {/if}

  <div class="index">
    <Number label="順番" bind:value={index} />
  </div>

  <div class="buttons">
    <Button passive text="キャンセル" disabled={false} on:click={onCancel} />

    {#if isEdit}
      <Button negative text="削除" disabled={false} on:click={onDelete} />
      <Button positive text="更新" disabled={disabledOk} on:click={onUpdate} />
    {:else}
      <Button active text="作成" disabled={disabledOk} on:click={onCreate} />
    {/if}
  </div>
</div>
