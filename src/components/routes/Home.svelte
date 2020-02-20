<script>
  import {
    accessToken,
    userProfile,
    existsClient,
    isAuthenticated,
    init,
    logout,
    login,
  } from '../../states/auth'

  init()
</script>

{#if !$existsClient}
  <p>...認証確認中</p>
{:else}
  {#if !$isAuthenticated}
    <button on:click={login}>Log in</button>
  {:else}
    <button on:click={logout}>Log out</button>
    <p>{$accessToken}</p>
    <p>{JSON.stringify($userProfile)}</p>
  {/if}
{/if}
