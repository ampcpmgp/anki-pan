<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import { nanoId as userNanoId, fetchAccountP } from '../../../states/user'
  import { bread, hasBread, fetch, errMsg } from '../../../states/bread-detail'
  import View from './View'
  import Edit from './Edit'

  export let nanoId = ''

  onMount(async () => {
    await fetchAccountP
    await fetch(nanoId)

    if (!$hasBread) {
      window.alert($errMsg)
      replace('/')
      return
    }
  })
</script>

{#await fetchAccountP}
  <p>ユーザー読み込み中...</p>
{:then _}

  {#if !$hasBread}
    <p>パン読み込み中...</p>
  {:else if $userNanoId === $bread.userNanoId}
    <Edit {nanoId} />
  {:else}
    <View />
  {/if}

{:catch _}

  {#if !$hasBread}
    <p>パン読み込み中...</p>
  {:else}
    <View />
  {/if}

{/await}
