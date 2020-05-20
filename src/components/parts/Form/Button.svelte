<script>
  export let text = ''
  export let subText = ''
  export let hot = false
  export let calm = false
  export let active = false
  export let passive = false
  export let positive = false
  export let negative = false
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
    appearance: none;
  }

  .sub {
    font-size: 80%;
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

  .positive {
    border-color: tomato;
    background-color: tomato;
    color: white;
  }
  .negative {
    border-color: dimgray;
    background-color: dimgray;
    color: white;
  }
</style>

<button
  type="button"
  class="button"
  class:disabled
  class:hot
  class:calm
  class:active
  class:passive
  class:positive
  class:negative
  on:click>
  {text}
  {#if subText}
    <span class="sub">{subText}</span>
  {/if}
</button>
