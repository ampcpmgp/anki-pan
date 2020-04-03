<script>
  import { createEventDispatcher } from 'svelte'
  import fether from 'feather-icons'
  import { slide } from 'svelte/transition'
  import { bread } from '../../../../utils/validator'
  import { speak } from '../../../utils/speech'
  import Text from '../Form/Text'
  import Button from '../Form/Button'

  export let name = ''
  export let reading = ''
  $: answserErrMsg = bread.answerName.getErrMsg(name)
  $: readingErrMsg = bread.reading.getErrMsg(reading)
  $: existsReading = !!reading
  $: disabledOk = !name

  const BALLOON_WIDTH = '30px'
  const dispatch = createEventDispatcher()

  const svg = {
    volume2: fether.icons['volume-2'].toSvg({
      width: '20px',
      height: 'auto',
    }),
  }

  function onCancel() {
    dispatch('cancel')
  }
  function onOk() {
    dispatch('ok')
  }
</script>

<style>
  .answer {
    display: inline-grid;
    grid-template-columns: 1fr auto;
    grid-gap: 12px;
    padding: 30px;
    font-size: 0.9em;
    border: solid 1px green;
    border-radius: 4px;
    position: absolute;
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
    grid-row: 1;
  }

  .reading {
    grid-row: 2;
  }

  .speak {
    cursor: pointer;
    display: grid;
    align-items: center;
  }

  .buttons {
    justify-self: end;
    grid-row: 3;
    grid-column: span 2;
  }
</style>

<div
  class="answer"
  style="--width: {BALLOON_WIDTH}"
  transition:slide={{ duration: 100 }}>
  <div class="buttons">
    <Button
      type="passive"
      text="キャンセル"
      disabled={false}
      on:click={onCancel} />
    <Button type="active" text="OK" disabled={disabledOk} on:click={onOk} />
  </div>

  <div class="reading">
    <Text
      label="読み"
      bind:value={reading}
      placeholder=""
      errMsg={readingErrMsg} />
  </div>

  {#if existsReading}
    <div class="speak reading" on:click={() => speak(reading)}>
      {@html svg.volume2}
    </div>
  {/if}

  <div class="name">
    <Text
      label="答え"
      bind:value={name}
      placeholder=""
      errMsg={answserErrMsg} />
  </div>

  {#if !existsReading}
    <div class="speak name" on:click={() => speak(name)}>
      {@html svg.volume2}
    </div>
  {/if}
</div>
