<script>
  export let text = ''
  export let type = ''
  export let disabled = false
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

  .disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .hot {
    border-color: red;
    color: red;
  }

  .calm {
    border-color: dodgerblue;
    color: dodgerblue;
  }

  .active {
    border-color: orange;
    color: orangered;
  }
  .passive {
    border-color: darkgray;
    color: dimgray;
  }
</style>

<div
  class="button"
  class:disabled
  class:hot={type === 'hot'}
  class:calm={type === 'calm'}
  class:active={type === 'active'}
  class:passive={type === 'passive'}
  on:click>
  {text}
</div>
