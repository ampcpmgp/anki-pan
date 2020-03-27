<script>
  import ErrorBalloon from '../Text/ErrorBalloon'
  export let label = ''
  export let value = ''
  export let placeholder = ''
  export let errMsg = ''
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
    <input type="text" bind:value {placeholder} />

    <div class="error">
      <ErrorBalloon message={errMsg} />
    </div>
  </div>
</label>
