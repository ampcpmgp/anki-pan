<script>
  import { createEventDispatcher, beforeUpdate } from 'svelte'
  import { getImageSize } from '../../../utils/file'
  import sleep from '../../../utils/sleep'
  import { speak } from '../../../utils/speech'

  export let imgSrc = ''
  export let editable = false
  export let answers = []
  export let playbackIndex = -1

  const dispatch = createEventDispatcher()

  let wrapper
  let bread
  let isPlay = false
  let pin = initialPos()
  let mousePos = initialPos()
  let currentRectangle = { left: 0, top: 0, width: 0, height: 0 }
  let currentRectangleStyle = ''
  let speakingIndex = -1
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

  $: wrapperAspectRatio = size.wrapper.width / size.wrapper.height
  $: imageAspectRatio = size.image.width / size.image.height
  $: isLandScape = imageAspectRatio > wrapperAspectRatio
  $: {
    currentRectangle.left =
      (pin.x > mousePos.x ? mousePos.x : pin.x) / size.bread.width
    currentRectangle.top =
      (pin.y > mousePos.y ? mousePos.y : pin.y) / size.bread.height
    currentRectangle.width = Math.abs(pin.x - mousePos.x) / size.bread.width
    currentRectangle.height = Math.abs(pin.y - mousePos.y) / size.bread.height

    currentRectangleStyle = getRectangleStyle(currentRectangle)
  }

  beforeUpdate(() => {
    if (playbackIndex === -1) return
    if (isPlay) return

    const answer = answers[playbackIndex]
    if (!answers) {
      playbackIndex = -1
      dispatch('end')
      return
    }

    play(answer)
  })

  async function play(answer) {
    isPlay = true
    const time =
      Animation.COUNT * Animation.DURATION_MSEC + Animation.BEFORE_SPEAKING_MSEC
    await sleep(time)
    speakingIndex = playbackIndex
    await sleep(Animation.AFTER_DISP_ANSWER)
    await speak(answer.name)
    isPlay = false
    dispatch('next')
    speakingIndex = -1
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

  function getOffset(event, element) {
    // 参考 - https://www.geeksforgeeks.org/how-to-get-relative-click-coordinates-on-the-target-element-using-jquery/
    return {
      x: event.pageX - element.offsetLeft - wrapper.offsetLeft,
      y: event.pageY - element.offsetTop - wrapper.offsetTop,
    }
  }

  function initialPos() {
    return { x: -1, y: -1 }
  }

  function existsPinned() {
    return pin.x !== -1 && pin.y !== -1
  }

  function onBreadMouseDown(e) {
    if (!editable) return

    const { x, y } = getOffset(e, bread)
    mousePos.x = pin.x = x
    mousePos.y = pin.y = y
  }

  function onBreadMouseUp() {
    dispatch('generateRectangle', { ...currentRectangle })

    pin = initialPos()
    mousePos = initialPos()
  }

  function onBreadMouseMove(e) {
    if (!existsPinned()) return

    const { x, y } = getOffset(e, bread)
    mousePos.x = x
    mousePos.y = y
  }

  function onBreadMouseLeave() {
    pin = initialPos()
    mousePos = initialPos()
  }

  async function setImageSize() {
    const { width, height } = await getImageSize(imgSrc)

    size.image.width = width
    size.image.height = height
  }
</script>

<style>
  .wrapper {
    display: grid;
    width: 100%;
    height: 100%;
  }

  .bread {
    background-size: contain;
    position: relative;
    border: solid 1px darkorange;
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
    border: none;
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

<div
  class="wrapper"
  bind:this={wrapper}
  bind:clientWidth={size.wrapper.width}
  bind:clientHeight={size.wrapper.height}>
  {#await setImageSize()}
    読込中...
  {:then value}
    <div
      class="bread"
      class:is-editable={editable}
      class:landscape={isLandScape}
      style="background-image: url({imgSrc})"
      bind:this={bread}
      bind:clientWidth={size.bread.width}
      bind:clientHeight={size.bread.height}
      on:mousedown={onBreadMouseDown}
      on:mouseup={onBreadMouseUp}
      on:mousemove={onBreadMouseMove}
      on:mouseleave={onBreadMouseLeave}>
      <img src={imgSrc} alt="" />

      <div class="rectangle current" style={currentRectangleStyle} />
      {#each answers as answer, i}
        <div
          class="rectangle"
          class:is-active={i === playbackIndex}
          class:is-speaking={i === speakingIndex}
          class:is-complete={i < playbackIndex}
          style={getRectangleStyle(answer)} />
      {/each}
    </div>
  {/await}
</div>
