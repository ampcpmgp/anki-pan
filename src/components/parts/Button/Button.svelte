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
    user-select: none;
    text-align: center;
    border-radius: 4px;
  }

  .button:hover {
    opacity: 0.5;
  }

  .button:active {
    transform: translate(1px, 1px);
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
  .button.passive {
    border-color: darkgray;
    color: dimgray;
  }
</style>

<div
  class="button"
  class:hot={type === 'hot'}
  class:calm={type === 'calm'}
  class:active={type === 'active'}
  class:passive={type === 'passive'}
  on:click>
  {text}
</div>
