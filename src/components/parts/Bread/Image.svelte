<script>
  import { getImageSize, readFile, compressImage } from '../../../utils/file'
  import { MAX_IMAGE_SIZE } from '../../../const/file'

  export let imgSrc

  let fileDrop
  let fileDropWidth = 0
  let fileDropHeight = 0
  let imageWidth = 0
  let imageHeight = 0

  $: fileDropAspectoRatio = fileDropWidth / fileDropHeight
  $: imageAspectoRatio = imageWidth / imageHeight
  $: isLandScape = imageAspectoRatio > fileDropAspectoRatio

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
    display: grid;
    align-items: center;
  }
  img {
    justify-self: center;
    width: auto;
    height: 100%;
    /* position: absolute を入れることで height を画面高さに調整可能。 */
    /* https://stackoverflow.com/questions/14554908/imgs-max-height-not-respecting-parents-dimensions */
    position: absolute;
  }
  img.landscape {
    width: 100%;
    height: auto;
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
      <div class="bread">
        <img class:landscape={isLandScape} src={imgSrc} alt="" />
      </div>
    {/await}
  {:else}
    <div class="message">
      <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
      <p class="invalid">このファイルは指定できません</p>
    </div>
  {/if}
</file-drop>
