<script>
  import { createEventDispatcher } from 'svelte'
  import { getImageSize, readFile, compressImage } from '../../../utils/file'
  import { MAX_IMAGE_SIZE } from '../../../const/file'

  export let imgSrc
  export let editable
  export let answers

  const dispatch = createEventDispatcher()

  let fileDrop
  let bread
  const size = {
    fileDrop: { width: 0, height: 0 },
    image: { width: 0, height: 0 },
    bread: { width: 0, height: 0 },
  }
  let pin = initialPos()
  let mousePos = initialPos()
  let currentRectangle = { left: 0, top: 0, width: 0, height: 0 }
  let currentRectangleStyle = ''

  $: fileDropAspectoRatio = size.fileDrop.width / size.fileDrop.height
  $: imageAspectoRatio = size.image.width / size.image.height
  $: isLandScape = imageAspectoRatio > fileDropAspectoRatio
  $: {
    currentRectangle.left =
      (pin.x > mousePos.x ? mousePos.x : pin.x) / size.bread.width
    currentRectangle.top =
      (pin.y > mousePos.y ? mousePos.y : pin.y) / size.bread.height
    currentRectangle.width = Math.abs(pin.x - mousePos.x) / size.bread.width
    currentRectangle.height = Math.abs(pin.y - mousePos.y) / size.bread.height

    currentRectangleStyle = getRectangleStyle(currentRectangle)
  }

  function getRectangleStyle({ left, top, width, height }) {
    return `
      left: ${left * 100}%;
      top: ${top * 100}%;
      width: ${width * 100}%;
      height: ${height * 100}%;
    `
  }

  function getOffset(event, element) {
    // 参考 - https://www.geeksforgeeks.org/how-to-get-relative-click-coordinates-on-the-target-element-using-jquery/
    return {
      x: event.pageX - element.offsetLeft,
      y: event.pageY - element.offsetTop,
    }
  }

  function initialPos() {
    return { x: -1, y: -1 }
  }

  function existsPinned() {
    return pin.x !== -1 && pin.y !== -1
  }

  function onBreadMouseDown(e) {
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

  async function onFileDrop(e) {
    if (!editable && !window.confirm('本当に変更しても良いですか?😳')) {
      return
    }

    const file = e.files[0]

    if (file.size > MAX_IMAGE_SIZE) {
      alert('ファイルサイズは2MBまでにしてください🙇🙇‍♀')
      return
    }

    const result = await compressImage(file)
    imgSrc = await readFile(result)
    await setImageSize()
  }
</script>

<style>
  file-drop {
    display: grid;
    width: 100%;
    height: 100%;
  }

  :global(.bread-image-file-drop.drop-valid) {
    background-color: rgba(0, 255, 0, 0.3);
  }
  :global(.bread-image-file-drop.drop-invalid) {
    background-color: rgba(255, 0, 0, 0.3);
  }
  .invalid {
    display: none;
  }
  :global(.bread-image-file-drop.drop-invalid) .invalid {
    display: grid;
  }
  :global(.bread-image-file-drop.drop-invalid) .valid {
    display: none;
  }

  .bread {
    cursor: crosshair;
    background-size: contain;
    position: relative;
    border: solid 1px darkorange;
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
    background-color: yellow;
  }
  .rectangle.current {
    opacity: 0.8;
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

  .message {
    display: grid;
    justify-content: center;
    align-items: center;
    border: solid 1px #555;
    color: #333;
    font-weight: bold;
    width: 100%;
    height: 100%;
  }
</style>

<file-drop
  disabled
  class="bread-image-file-drop"
  accept="image/*"
  bind:this={fileDrop}
  bind:clientWidth={size.fileDrop.width}
  bind:clientHeight={size.fileDrop.height}
  on:filedrop={onFileDrop}>
  {#if imgSrc}
    {#await setImageSize()}
      読込中...
    {:then value}
      <div
        class="bread"
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
        {#each answers as answer}
          <div class="rectangle" style={getRectangleStyle(answer)} />
        {/each}
      </div>
    {/await}
  {:else}
    <div class="message">
      <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
      <p class="invalid">このファイルは指定できません</p>
    </div>
  {/if}
</file-drop>
