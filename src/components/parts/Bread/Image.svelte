<script>
  import { onMount } from 'svelte'
  import { getImageSize, readFile } from '../../../utils/file'

  let fileDrop
  export let imgBase64

  onMount(() => {
    fileDrop.addEventListener('filedrop', async e => {
      const file = e.files[0]
      const result = await readFile(file)
      const { width, height } = await getImageSize(result)

      console.log(file.size, width, height)
    })
  })
</script>

<style>
  file-drop {
    display: grid;
    justify-content: center;
    align-items: center;
    border: solid 1px #555;
    color: #333;
    font-weight: bold;
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
    padding: 60px 10px;
  }
</style>

<file-drop class="bread-image-file-drop" accept="image/*" bind:this={fileDrop}>
  {#if imgBase64}
    <img src={imgBase64} alt="" />
  {:else}
    <div class="message">
      <p class="valid">画像ファイルをドラッグ＆ドロップ</p>
      <p class="invalid">このファイルは指定できません</p>
    </div>
  {/if}
</file-drop>
