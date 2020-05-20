<script>
  import { createEventDispatcher } from 'svelte'
  import fether from 'feather-icons'
  import { slide } from 'svelte/transition'
  import { default as Lang } from '../../../../const/lang'
  import { bread } from '../../../../utils/validator'
  import { speak } from '../../../utils/speech'
  import { getSelectableList } from '../../../utils/lang'

  import Text from '../Form/Text'
  import Button from '../Form/Button'
  import Number from '../Form/Number'
  import { default as SelectboxColored } from '../Form/SelectboxColored'

  export let name = ''
  export let reading = ''
  export let index = 0
  export let lang = Lang.JA_JP
  export let isEdit = false
  export let coord = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }

  let isCtrlDown = false

  $: answserErrMsg = bread.answerName.getErrMsg(name)
  $: readingErrMsg = bread.reading.getErrMsg(reading)
  $: existsReading = !!reading
  $: disabledOk = !name || answserErrMsg || readingErrMsg
  $: arrowAimUp = coord.top < 0.7

  const BALLOON_WIDTH = '30px'
  const dispatch = createEventDispatcher()
  const langOptions = getSelectableList(lang)

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

  function getWrapperStyle() {
    const { top, left, bottom, right } = coord
    const topPercent = 100 * top
    const leftPercent = 100 * left
    const bottomPercent = 100 * bottom
    const rightPercent = 100 * right
    const aimUpStyle = `top: calc(${topPercent}% + 20px);`
    const aimDownStyle = `
      top: calc(${bottomPercent}% - 20px);
      transform: translateY(-100%);
    `
    const rightStyle = `right: calc(${rightPercent}% - 15px);`

    // 回答が画面左端を超えないようにするため指定。
    const leftStyle = `left: calc(${leftPercent}% - 30px);`
    const isLeft = left < 0.5

    return `
      ${arrowAimUp ? aimUpStyle : aimDownStyle}
      ${rightStyle}
      ${isLeft ? leftStyle : ''}
    `
  }

  function onWindowKeyUp() {
    isCtrlDown = false
  }

  function onWindowKeyDown(event) {
    if (event.ctrlKey) {
      isCtrlDown = true
    }

    if (event.key === 'Escape') {
      onCancel()
      return
    }

    if (event.ctrlKey && event.key === 'Enter' && !disabledOk) {
      if (isEdit) {
        onUpdate()
      } else {
        onCreate()
      }

      return
    }

    if (isEdit && event.key === 'Delete') {
      onDelete()
    }
  }

  function onSpeak(text, lang) {
    if (isCtrlDown) return

    speak(text, lang)
  }
</script>

<style>
  .wrapper {
    position: absolute;
  }

  .answer {
    display: inline-grid;
    grid-template-columns: 1fr auto;
    grid-gap: 12px;
    width: 340px;
    padding: 30px;
    font-size: 0.9em;
    border: solid 1px green;
    border-radius: 4px;
    background-color: white;
  }

  .answer:before {
    content: '';
    position: absolute;
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid green;
  }

  .answer:after {
    content: '';
    position: absolute;
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid #fff;
  }

  .answer.aim-up:before {
    top: calc(-1 * var(--width));
  }
  .answer.aim-up:after {
    top: calc(-1 * var(--width) + 1px);
  }

  .answer.aim-down:before {
    transform: rotateX(180deg);
    bottom: calc(-1 * var(--width));
  }
  .answer.aim-down:after {
    transform: rotateX(180deg);
    bottom: calc(-1 * var(--width) + 1px);
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

  .sub-info {
    z-index: 1;
    grid-row: 3;
    display: grid;
    grid-template-columns: 90px auto;
    align-items: center;
    grid-column-gap: 20px;
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
    grid-column: span 3;
  }
</style>

<svelte:window on:keydown={onWindowKeyDown} on:keyup={onWindowKeyUp} />

<div class="wrapper" style={getWrapperStyle()}>
  <div
    class="answer"
    class:aim-up={arrowAimUp}
    class:aim-down={!arrowAimUp}
    style="--width: {BALLOON_WIDTH};"
    transition:slide={{ duration: 100 }}>
    <div class="name">
      <Text
        label="答え"
        bind:value={name}
        focused={false}
        placeholder=""
        errMsg={answserErrMsg} />
    </div>

    {#if !existsReading}
      <button
        type="button"
        class="speak name"
        on:click={() => onSpeak(name, lang)}>
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
      <button
        type="button"
        class="speak reading"
        on:click={() => onSpeak(reading, lang)}>
        {@html svg.volume2}
      </button>
    {/if}

    <div class="sub-info">
      <Number label="順番" bind:value={index} />
      <SelectboxColored label="" options={langOptions} bind:value={lang} />
    </div>

    <div class="buttons">
      <Button
        passive
        text="キャンセル"
        subText="(Escape)"
        disabled={false}
        on:click={onCancel} />

      {#if isEdit}
        <Button
          negative
          text="削除"
          subText="(Delete)"
          disabled={false}
          on:click={onDelete} />
        <Button
          positive
          text="更新"
          subText="(Ctrl + Enter)"
          disabled={disabledOk}
          on:click={onUpdate} />
      {:else}
        <Button
          active
          text="作成"
          subText="(Ctrl + Enter)"
          disabled={disabledOk}
          on:click={onCreate} />
      {/if}
    </div>
  </div>
</div>
