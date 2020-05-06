<script>
  export let label = ''
  export let options = []
  export let value = ''
</script>

<style>
  label {
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }
</style>

<label>
  {label}
  <select bind:value>
    {#each options as option}
      <option value={option.key}>{option.value}</option>
    {/each}
  </select>
</label>
