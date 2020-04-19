<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import * as db from '../../../utils/db'
  import { nanoId as userNanoId, fetchAccount } from '../../../states/user'
  import { fetch, errMsg } from '../../../states/bread-detail'
  import {
    title,
    image,
    answers,
    isPublic,
    license,
    source,
  } from '../../../states/user-input/bread-edit'
  import View from './View'
  import Edit from './Edit'

  export let nanoId = ''

  let bread
  let fetchAccountP = fetchAccount()

  onMount(async () => {
    bread = await db.getBread(nanoId)

    if (!bread) {
      bread = await fetch(nanoId)

      if (!bread) {
        window.alert($errMsg)
        replace('/')
        return
      }

      await db.setBread(bread)
    }

    await fetchAccountP

    if ($userNanoId === bread.userNanoId) {
      $title = bread.title
      $image = bread.image
      $answers = bread.answers
      $isPublic = bread.isPublic
      $license = bread.license
      $source = bread.source
    }
  })
</script>

{#await fetchAccountP}
  <p>ユーザー読み込み中...</p>
{:then _}

  {#if !bread}
    <p>パン読み込み中...</p>
  {:else if $userNanoId === bread.userNanoId}
    <Edit {nanoId} />
  {:else}
    <View {bread} />
  {/if}

{:catch _}
  {#if !bread}
    <p>パン読み込み中...</p>
  {:else}
    <View {bread} />
  {/if}
{/await}
