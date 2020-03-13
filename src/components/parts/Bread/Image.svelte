<script>
  import { readFile, compressImage } from '../../../utils/file'
  import { MAX_IMAGE_SIZE } from '../../../const/file'

  export let imgSrc

  let fileDrop

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
  :global(.bread-image-file-drop.drop-invalid) .invalid {
    display: grid;
  }
  :global(.bread-image-file-drop.drop-invalid) .valid {
    display: none;
  }
  .invalid {
    display: none;
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

  .bread {
    display: grid;
  }

  .bread {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>

<file-drop
  disabled
  class="bread-image-file-drop"
  accept="image/*"
  bind:this={fileDrop}
  on:filedrop={onFileDrop}>
  {#if imgSrc}
    <div class="bread" style="background-image: url({imgSrc})" />
  {:else}
    <div class="message">
      <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
      <p class="invalid">このファイルは指定できません</p>
    </div>
  {/if}
</file-drop>
