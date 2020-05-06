<script>
  export let label = ''
  export let options = []
  export let value = ''

  function getSelectedColor() {
    return options.find(option => option.value === value).color || 'initial'
  }
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
  <select bind:value style="color: {getSelectedColor()}">
    {#each options as option}
      <option style="color: {option.color || 'initial'}" value={option.value}>
        {option.name}
      </option>
    {/each}
  </select>
</label>
