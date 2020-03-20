<script>
  export let label
  export let value
  export let placeholder
</script>

<style>
  label {
    display: inline-grid;
    align-items: center;
    grid-auto-flow: column;
    grid-column-gap: 8px;
    grid-template-columns: auto 1fr;
  }
</style>

<label>
  {label}
  <input type="text" bind:value on:input {placeholder} />
</label>
