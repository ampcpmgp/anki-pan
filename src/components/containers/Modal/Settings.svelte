<script>
  import Settings from '../../parts/Modal/Settings'
  import { id } from '../../../states/user'
  import { isOpen, closeModal } from '../../../states/settings'
</script>

{#if $isOpen}
  <Settings userId={$id} on:click={closeModal} />
{/if}
