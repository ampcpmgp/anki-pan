<script>
  import { onMount } from 'svelte'
  import ErrorBalloon from '../Text/ErrorBalloon'
  export let label = ''
  export let value = ''
  export let placeholder = ''
  export let errMsg = ''
  export let focused = false

  let textElm

  onMount(() => {
    if (focused) {
      textElm.focus()
    }
  })
</script>

<style>
  label {
    display: inline-grid;
    align-items: center;
    grid-column-gap: 8px;
    grid-template-columns: auto 1fr;
  }

  .wrapper {
    position: relative;
  }

  input {
    width: 100%;
    border: solid 1px #999;
  }

  .error {
    position: absolute;
    right: 0;
    width: 100%;
  }
</style>

<label>
  <span class="term">{label}</span>

  <div class="wrapper">
    <input type="text" bind:this={textElm} bind:value {placeholder} />

    <div class="error">
      <ErrorBalloon message={errMsg} />
    </div>
  </div>
</label>
