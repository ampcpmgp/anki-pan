<script>
  import feather from 'feather-icons'
  import {
    isExistsClient,
    isAuthenticated,
    logout,
    login,
  } from '../../../states/auth'
  import { openModal } from '../../../states/settings'
  import H1 from '../../parts/H1/Home'
  import Button from '../../parts/Form/Button'
  import { version } from '../../../../package.json'
  import { push } from 'svelte-spa-router'

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

  export function newBread() {
    push(`/breads/new`)
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

  .new-bread,
  .settings {
    cursor: pointer;
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>

<header>
  <H1 {version} />

  <div class="right-side">
    {#if !$isExistsClient}
      <p>...認証確認中</p>
    {:else if !$isAuthenticated}
      <Button text="ログイン" hot on:click={login} />
    {:else}
      <div class="new-bread" on:click={newBread}>
        {@html svg.plusCircle}
      </div>

      <Button text="ログアウト" calm on:click={logout} />

      <div class="settings" on:click={openModal}>
        {@html svg.settings}
      </div>
    {/if}
  </div>
</header>
