<script>
  import { link } from 'svelte-spa-router'
  import { getAuth0, isAuthenticated, logout, login } from '../../states/auth'

  import { fetchAccount, account } from '../../states/user'
</script>

<p>テストページ</p>
{#await getAuth0()}
  <p>...認証確認中</p>
{:then}
  <a href="/" use:link>homeへ</a>

  {#if !$isAuthenticated}
    <button on:click={login}>Log in</button>
  {:else}
    <button on:click={logout}>Log out</button>

    {#await fetchAccount()}
      <p>...ユーザー情報取得中</p>
    {:then}
      <p>{JSON.stringify($account)}</p>
    {/await}
  {/if}
{/await}
