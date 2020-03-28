<script>
  import feather from 'feather-icons'
  import {
    isExistsClient,
    isAuthenticated,
    logout,
    login,
  } from '../../../states/auth'
  import H1 from '../../parts/H1/Home'
  import Button from '../../parts/Form/Button'
  import { version } from '../../../../package.json'

  const svg = {
    plusCircle: feather.icons['plus-circle'].toSvg({
      width: '30px',
      height: 'auto',
      stroke: 'darkorange',
    }),
    settings: feather.icons.settings.toSvg({
      stroke: '#2f363d',
    }),
  }
</script>

<style>
  header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      to right,
      lightskyblue 0%,
      hotpink 100%
    );
  }

  .right-side {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 8px;
  }
</style>

<header>
  <H1 {version} />

  <div class="right-side">
    {#if !$isExistsClient}
      <p>...認証確認中</p>
    {:else if !$isAuthenticated}
      <Button text="ログイン" type="hot" on:click={login} />
    {:else}
      {@html svg.plusCircle}
      <Button text="ログアウト" type="calm" on:click={logout} />

      {@html svg.settings}
    {/if}
  </div>
</header>
