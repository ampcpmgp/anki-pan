<script>
  export let label = ''
  export let options = []
  export let value = ''

  function getSelectedColor() {
    const option = options.find(option => option.value === value)
    return (option && option.color) || 'initial'
  }
</script>

<style>
  /* 参考: https://stackoverflow.com/questions/10672586/how-to-make-select-elements-shrink-to-max-width-percent-style-within-fieldset */
  select {
    width: 100%;
    max-width: 100%;
  }

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
