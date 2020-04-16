<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import { getBread, setBread } from '../../../utils/db'
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

  onMount(async () => {
    try {
      bread = await getBread(nanoId)
    } catch (error) {
      // Firefox のシークレットブラウザではエラーが起きるためスルーする。
      console.info(error)
    }

    if (!bread) {
      bread = await fetch(nanoId)

      if (!bread) {
        window.alert($errMsg)
        replace('/')
        return
      }

      try {
        await setBread(bread)
      } catch (error) {
        // Firefox のシークレットブラウザではエラーが起きるためスルーする。
        console.info(error)
      }
    }

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

{#await fetchAccount()}
  <p>ユーザー読み込み中...</p>
{:then _}

  {#if bread}
    {#if $userNanoId === bread.userNanoId}
      <Edit {nanoId} />
    {:else}
      <View {bread} />
    {/if}
  {:else}
    <p>パン読み込み中...</p>
  {/if}

{:catch _}
  {#if bread}
    <View {bread} />
  {:else}
    <p>パン読み込み中...</p>
  {/if}
{/await}
