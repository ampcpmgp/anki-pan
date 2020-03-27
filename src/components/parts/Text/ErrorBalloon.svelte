<script>
  import { slide } from 'svelte/transition'
  export let message = ''

  const BALLOON_WIDTH = '20px'
</script>

<style>
  p {
    display: inline-grid;
    padding: 0 4px;
    font-size: 0.9em;
    border: solid 1px red;
    color: red;
    border-radius: 4px;
    position: absolute;
    top: calc(var(--width) / 2);
    background-color: white;
  }

  p:before {
    content: '';
    position: absolute;
    top: calc(-1 * var(--width));
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid red;
  }

  p:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--width) + 1px);
    right: calc(var(--width) / 2);
    border: calc(var(--width) / 2) solid transparent;
    border-bottom: calc(var(--width) / 2) solid #fff;
  }
</style>

{#if !!message}
  <p style="--width: {BALLOON_WIDTH}" transition:slide={{ duration: 100 }}>
    {message}
  </p>
{/if}
