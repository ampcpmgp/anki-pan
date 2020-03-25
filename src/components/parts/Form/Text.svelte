<script>
  export let label = ''
  export let value = ''
  export let placeholder = ''
  export let errMsg = ''
</script>

<style>
  label {
    display: inline-grid;
    align-items: center;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 8px;
    grid-template-columns: auto 1fr;
  }

  p {
    justify-self: end;
    grid-column: 1 / -1;
    color: red;
  }
</style>

<label>
  {label}
  <input type="text" bind:value {placeholder} />
  {#if errMsg}
    <p>{errMsg}</p>
  {/if}
</label>
