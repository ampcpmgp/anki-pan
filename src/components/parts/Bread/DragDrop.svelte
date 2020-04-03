<script>
  import { createEventDispatcher } from 'svelte'
  import { MAX_IMAGE_SIZE } from '../../../const/file'
  import { readFile, compressImage } from '../../../utils/file'

  const dispatch = createEventDispatcher()

  async function onFileDrop(e) {
    const file = e.files[0]

    if (file.size > MAX_IMAGE_SIZE) {
      alert('ファイルサイズは2MBまでにしてください🙇🙇‍♀')
      return
    }

    const result = await compressImage(file)
    const imgSrc = await readFile(result)

    dispatch('drop', imgSrc)
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
  on:filedrop={onFileDrop}>
  <div class="message">
    <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
    <p class="invalid">このファイルは指定できません</p>
  </div>
</file-drop>
