<script>
  export let text
  export let type
</script>

<style>
  .button {
    background-color: transparent;
    cursor: pointer;
    border-style: solid;
    border-width: 1px;
    display: inline-grid;
    padding: 2px 8px;
  }

  .button.hot {
    border-color: red;
    color: red;
  }

  .button.calm {
    border-color: dodgerblue;
    color: dodgerblue;
  }

  .button.active {
    border-color: orange;
    color: orangered;
  }
</style>

<div
  class="button"
  class:hot={type === 'hot'}
  class:calm={type === 'calm'}
  class:active={type === 'active'}>
  {text}
</div>
