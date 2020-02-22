<script>
  import { link } from 'svelte-spa-router'
  import {
    getAuth0,
    isAuthenticated,
    getAuthorization,
    getUserProfile,
    logout,
    login,
  } from '../../states/auth'
</script>

{#await getAuth0()}
  <p>...認証確認中</p>
{:then _}
  <a href="/test" use:link>testへ</a>

  {#if !$isAuthenticated}
    <button on:click={login}>Log in</button>
  {:else}
    <button on:click={logout}>Log out</button>

    {#await getAuthorization() then value}
      <p>{value}</p>
    {/await}

    {#await getUserProfile() then value}
      <p>{JSON.stringify(value)}</p>
    {/await}
  {/if}
{/await}
