<script>
  import { slide } from 'svelte/transition'
  export let message = ''
</script>

<style>
  p {
    font-size: 0.9em;
    color: red;
    padding: 6px;
    border-radius: 4px;
    background-color: rgba(255, 128, 128, 0.1);
  }
</style>

{#if !!message}
  <p transition:slide={{ duration: 100 }}>{message}</p>
{/if}
