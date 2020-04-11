<script>
  import { isAuthenticated } from '../../../states/auth'
  import New from '../BreadGroup/New'
  import Favorites from '../BreadGroup/Favorites'
  import SelfMade from '../BreadGroup/SelfMade'
  import Cache from '../BreadGroup/Cache'
</script>

<style>
  .content {
    margin: 20px 0;
    display: grid;
    grid-row-gap: 40px;
  }
</style>

<div class="content">
  <New />
  {#if $isAuthenticated}
    <Favorites />
    <SelfMade />
  {/if}
  <Cache />
</div>
