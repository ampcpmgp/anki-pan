<script>
  import { getImageSize, readFile, compressImage } from '../../../utils/file'
  import { MAX_IMAGE_SIZE } from '../../../const/file'

  export let imgSrc

  let fileDrop
  let fileDropWidth = 0
  let fileDropHeight = 0
  let imageWidth = 0
  let imageHeight = 0
  let pin = initialPos()
  let mousePos = initialPos()

  $: fileDropAspectoRatio = fileDropWidth / fileDropHeight
  $: imageAspectoRatio = imageWidth / imageHeight
  $: isLandScape = imageAspectoRatio > fileDropAspectoRatio

  function initialPos() {
    return { x: -1, y: -1 }
  }

  function existsPinned() {
    return pin.x !== -1 && pin.y !== -1
  }

  function onBreadClick(e) {
    mousePos.x = pin.x = e.clientX
    mousePos.y = pin.y = e.clientY
  }

  function onBreadMouseMove(e) {
    if (!existsPinned()) return

    mousePos.x = e.clientX
    mousePos.y = e.clientY
  }

  async function setImageSize() {
    const { width, height } = await getImageSize(imgSrc)

    imageWidth = width
    imageHeight = height
  }

  async function onFileDrop(e) {
    const file = e.files[0]

    if (file.size > MAX_IMAGE_SIZE) {
      alert('ファイルサイズは2MBまでにしてください🙇🙇‍♀')
      return
    }

    const result = await compressImage(file)
    imgSrc = await readFile(result)
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
    cursor: pointer;
    background-size: contain;
  }
  .bread.landscape {
    margin: auto 0;
    width: 100%;
  }
  .bread:not(.landscape) {
    margin: 0 auto;
    height: 100%;
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
  bind:clientWidth={fileDropWidth}
  bind:clientHeight={fileDropHeight}
  on:filedrop={onFileDrop}>
  {#if imgSrc}
    {#await setImageSize()}
      読込中...
    {:then value}
      <div
        class="bread"
        class:landscape={isLandScape}
        style="background-image: url({imgSrc})"
        on:click={onBreadClick}
        on:click={onBreadMouseMove}>
        <img src={imgSrc} alt="" />
      </div>
    {/await}
  {:else}
    <div class="message">
      <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
      <p class="invalid">このファイルは指定できません</p>
    </div>
  {/if}
</file-drop>
