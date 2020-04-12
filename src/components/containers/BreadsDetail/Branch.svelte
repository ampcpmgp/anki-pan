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
    const fetchAccountP = fetchAccount()
    bread = await getBread(nanoId)

    if (!bread) {
      bread = await fetch(nanoId)

      if (!bread) {
        window.alert($errMsg)
        replace('/')
        return
      }

      setBread(bread)
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

{#if bread}
  {#if $userNanoId === bread.userNanoId}
    <Edit {nanoId} />
  {:else}
    <View {bread} />
  {/if}
{:else}
  <p>読み込み中...</p>
{/if}
