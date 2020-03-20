<script>
  export let options
  export let selected
</script>

<style>
  label {
    display: inline-grid;
    grid-auto-flow: column;
    grid-column-gap: 8px;
  }
</style>

<label>
  ライセンス
  <select on:change bind:value={selected}>
    {#each options as option}
      <option value={option.key}>{option.value}</option>
    {/each}
  </select>
</label>
