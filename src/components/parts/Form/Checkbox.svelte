<script>
  export let label
  export let checked
</script>

<style>
  label {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 4px;
  }
</style>

<label>
  <input type="checkbox" bind:checked />
  {label}
</label>
