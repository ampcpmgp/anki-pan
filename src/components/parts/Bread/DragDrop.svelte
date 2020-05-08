<script>
  import { createEventDispatcher } from 'svelte'
  import Validation from '../../../../const/validation'
  import { bread } from '../../../../utils/validator'
  import MimeType from '../../../const/mime-type'
  import { readFile, compressImage } from '../../../utils/file'

  const dispatch = createEventDispatcher()

  async function getImage(file) {
    if (file.type === MimeType.SVG) {
      const image = await readFile(file)
      return image
    }

    const result = await compressImage(file)
    const image = await readFile(result)

    return image
  }

  async function onFileDrop(e) {
    const file = e.files[0]
    const image = await getImage(file)

    if (bread.image.validate(image) === Validation.SIZE_OVER) {
      alert('ファイルサイズは2MBまでにしてください🙇🙇‍♀')
      return
    }

    dispatch('drop', image)
  }
</script>

<style>
  file-drop {
    display: grid;
    width: 100%;
    height: 100%;
    text-align: center;
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
    <p class="valid">
      画像ファイルをドラッグ＆ドロップ
      <br />
      OR
      <br />
      画像データをコピー＆ペースト
    </p>
    <p class="invalid">このファイルは指定できません</p>
  </div>
</file-drop>
