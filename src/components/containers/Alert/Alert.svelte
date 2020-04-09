<script>
  import { fade } from 'svelte/transition'
  import { success } from '../../../states/alert'
  import Success from '../../parts/Text/Success'

  $: {
    setTimeout(() => {
      $success = ''
    }, 3000)
  }

  function remove() {
    $success = ''
  }
</script>

<style>
  .alert-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
</style>

{#if !!$success}
  <div transition:fade on:click={remove} class="alert-wrapper">
    <Success message={$success} />
  </div>
{/if}
