<script>
  import { createEventDispatcher, beforeUpdate } from 'svelte'
  import { default as Lang } from '../../../../const/lang'
  import { getImageSize } from '../../../utils/file'
  import sleep from '../../../utils/sleep'
  import { speak } from '../../../utils/speech'
  import Answer from './Answer'

  export let image = ''
  export let editable = false
  export let answers = []
  export let playbackIndex = -1
  export let height = 0
  export let isPause = true

  const dispatch = createEventDispatcher()

  let breadElm
  let currentRectangleElm
  let pin = initialPos()
  let mousePos = initialPos()
  let currentRectangle = { top: 0, left: 0, width: 0, height: 0 }
  let currentRectangleStyle = ''
  let answerIndex = -1
  let answerNewIndex = -1
  let speakingIndex = -1
  let answerLang = Lang.JA_JP
  let isSelecting = false
  let answerLoc = { top: 0, left: 0 }
  let answerName = ''
  let answerReading = ''
  let isSpeaking = false
  // DOMや画像の縦横幅を設定する
  const size = {
    wrapper: { width: 0, height: 0 },
    image: { width: 0, height: 0 },
    bread: { width: 0, height: 0 },
  }
  const Animation = {
    DURATION_MSEC: 400,
    COUNT: 3,
    AFTER_DISP_ANSWER: 300,
    BEFORE_SPEAKING_MSEC: 500,
  }

  $: wrapperAspectRatio = size.wrapper.width / height
  $: imageAspectRatio = size.image.width / size.image.height
  $: isLandScape = imageAspectRatio > wrapperAspectRatio
  $: isAnswerEdit = answerIndex !== answers.length
  $: {
    currentRectangle.left =
      (pin.x > mousePos.x ? mousePos.x : pin.x) / size.bread.width
    currentRectangle.top =
      (pin.y > mousePos.y ? mousePos.y : pin.y) / size.bread.height
    currentRectangle.width = Math.abs(pin.x - mousePos.x) / size.bread.width
    currentRectangle.height = Math.abs(pin.y - mousePos.y) / size.bread.height

    currentRectangleStyle = getRectangleStyle(currentRectangle)

    answerLoc.top = currentRectangle.top + currentRectangle.height
    answerLoc.left = currentRectangle.left + currentRectangle.width
  }

  beforeUpdate(() => {
    if (playbackIndex === -1) return
    if (isSpeaking) return

    if (isPause) {
      speakingIndex = -1
      return
    }

    const answer = answers[playbackIndex]
    if (!answer) {
      dispatch('end')
      return
    }

    play(answer)
  })

  function completeSpeaking() {
    speakingIndex = -1
    isSpeaking = false
  }

  async function play(answer) {
    isSpeaking = true

    const time =
      Animation.COUNT * Animation.DURATION_MSEC + Animation.BEFORE_SPEAKING_MSEC

    // iOS/Safari では、アクション時に同期的に音声再生する必要がある。
    speak('')

    await sleep(time)

    if (isPause) {
      completeSpeaking()
      return
    }

    speakingIndex = playbackIndex
    await sleep(Animation.AFTER_DISP_ANSWER)

    if (isPause) {
      completeSpeaking()
      return
    }

    await speak(answer.reading || answer.name)

    if (isPause) {
      completeSpeaking()
      return
    }

    dispatch('next')

    completeSpeaking()
  }

  function getRectangleStyle({ left, top, width, height }) {
    return `
      left: ${left * 100}%;
      top: ${top * 100}%;
      width: ${width * 100}%;
      height: ${height * 100}%;
      animation-duration: ${Animation.DURATION_MSEC}ms;
      animation-iteration-count: ${Animation.COUNT};
    `
  }

  // 参考
  // - https://stackoverflow.com/questions/48389143/mouse-coordinates-relative-to-currenttarget-in-react-in-event-handler
  // - https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
  function getOffset(event) {
    const currentTargetRect = event.currentTarget.getBoundingClientRect()

    return {
      x: event.pageX - currentTargetRect.left - window.scrollX,
      y: event.pageY - currentTargetRect.top - window.scrollY,
    }
  }

  function init() {
    answerName = ''
    answerReading = ''

    isSelecting = false

    pin = initialPos()
    mousePos = initialPos()
  }

  function initialPos() {
    return { x: -1, y: -1 }
  }

  function existsPinned() {
    return pin.x !== -1 && pin.y !== -1
  }

  function onBreadMouseDown(e) {
    if (!editable) return
    if (isSelecting) return
    if (e.target !== breadElm) return

    const { x, y } = getOffset(e)
    mousePos.x = pin.x = x
    mousePos.y = pin.y = y
  }

  function onBreadMouseUp() {
    if (!existsPinned()) return
    if (isSelecting) return

    answerNewIndex = answerIndex = answers.length
    isSelecting = true
  }

  function onBreadMouseMove(e) {
    if (!existsPinned()) return
    if (isSelecting) return

    const { x, y } = getOffset(e)
    mousePos.x = x
    mousePos.y = y
  }

  function onBreadMouseLeave() {
    if (isSelecting) return

    pin = initialPos()
    mousePos = initialPos()
  }

  async function setImageSize() {
    // Firefox v75.0 ではなぜか ここで sleep(0) を入れないと、
    // ２回パン画像を読み込んだ時に、前回の width, height が取得されてしまう問題に対応。
    // 関連 issue 見当たらず。
    await sleep(0)
    const { width, height } = await getImageSize(image)

    size.image.width = width
    size.image.height = height
  }

  function onAnswerUpdate() {
    dispatch('answerUpdate', {
      answer: {
        ...currentRectangle,
        name: answerName,
        reading: answerReading,
        lang: answerLang,
      },
      index: answerIndex,
      newIndex: answerNewIndex,
    })

    init()
  }

  function onAnswerCreate() {
    dispatch('answerCreate', {
      answer: {
        ...currentRectangle,
        name: answerName,
        reading: answerReading,
        lang: answerLang,
      },
      newIndex: answerNewIndex,
    })

    init()
  }

  function onAnswerDelete() {
    dispatch('answerDelete', {
      index: answerIndex,
    })

    init()
  }

  function openAnswer(e, answer, i) {
    isSelecting = true
    pin.x = answer.left * size.bread.width
    pin.y = answer.top * size.bread.height
    mousePos.x = (answer.left + answer.width) * size.bread.width
    mousePos.y = (answer.top + answer.height) * size.bread.height
    answerName = answer.name
    answerReading = answer.reading

    answerNewIndex = answerIndex = i
  }

  function onWindowKeyDown(e) {
    if (e.keyCode === 27) {
      init()
    }
  }

  function getAnswerCoord() {
    const { top, left, width, height } = currentRectangle

    return {
      top: top + height,
      left,
      bottom: top,
      right: 1 - (left + width),
    }
  }
</script>

<style>
  .wrapper {
    display: grid;
    /* margin幅を引く。 marginは .bread の box-shadow用 */
    width: calc(100% - 2px);
    height: calc(var(--height) - 2px);
    margin: 1px;
  }

  .bread {
    background-size: contain;
    position: relative;
    /* border にしてしまうと、1px分、画像と座標が異るため、box-shadowを利用 */
    box-shadow: 0 0 0 1px darkorange;
  }
  .bread.is-editable {
    cursor: crosshair;
  }
  .bread.landscape {
    margin: auto 0;
    width: 100%;
  }
  .bread:not(.landscape) {
    margin: 0 auto;
    height: 100%;
  }

  .rectangle {
    position: absolute;
    background-color: white;
    border: solid 1px #555;
    cursor: pointer;
  }
  .rectangle.current {
    opacity: 0.8;
  }
  .rectangle.is-active {
    animation-name: flashing;
  }
  .rectangle.is-speaking {
    background-color: transparent;
  }
  .rectangle.is-complete {
    background-color: transparent;
  }

  @keyframes flashing {
    50% {
      background-color: lightpink;
    }
  }
  img {
    visibility: hidden;
    pointer-events: none;
  }
  .bread.landscape img {
    width: 100%;
  }
  .bread:not(.landscape) img {
    height: 100%;
    max-height: 100%;
  }
</style>

<svelte:window on:keydown={onWindowKeyDown} />

<div
  class="wrapper"
  style="--height: {height}px"
  bind:clientWidth={size.wrapper.width}
  bind:clientHeight={size.wrapper.height}>
  {#await setImageSize()}
    読込中...
  {:then value}
    <div
      class="bread"
      class:is-editable={editable}
      class:landscape={isLandScape}
      style="background-image: url({image})"
      bind:this={breadElm}
      bind:clientWidth={size.bread.width}
      bind:clientHeight={size.bread.height}
      on:mousedown={onBreadMouseDown}
      on:mouseup={onBreadMouseUp}
      on:mousemove={onBreadMouseMove}
      on:mouseleave={onBreadMouseLeave}>
      <img src={image} alt="" />

      <div
        class="rectangle current"
        bind:this={currentRectangleElm}
        style={currentRectangleStyle} />

      {#each answers as answer, i}
        <div
          class="rectangle"
          class:is-active={!isPause && i === playbackIndex}
          class:is-speaking={i === speakingIndex}
          class:is-complete={i < playbackIndex}
          style={getRectangleStyle(answer)}
          on:click={e => openAnswer(e, answer, i)} />
      {/each}

      {#if isSelecting}
        <Answer
          bind:name={answerName}
          bind:reading={answerReading}
          bind:index={answerNewIndex}
          bind:lang={answerLang}
          isEdit={isAnswerEdit}
          coord={getAnswerCoord()}
          on:cancel={init}
          on:delete={onAnswerDelete}
          on:create={onAnswerCreate}
          on:update={onAnswerUpdate} />
      {/if}
    </div>
  {/await}
</div>
