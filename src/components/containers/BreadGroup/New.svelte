<script>
  import { isExistsClient } from '../../../states/auth'
</script>

<div class="wrapper">
  {#if !$isExistsClient}
    <p>...認証確認中</p>
  {:else}
    <p>tests</p>
  {/if}
</div>
