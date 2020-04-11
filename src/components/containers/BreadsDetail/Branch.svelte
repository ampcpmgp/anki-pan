<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import { getBread, setBread } from '../../../utils/db'
  import { nanoId as userNanoId, fetchAccount } from '../../../states/user'
  import { get, errMsg } from '../../../states/bread-detail'
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

  let editMode = false
  let viewMode = false

  onMount(async () => {
    await fetchAccount()

    if (!$userNanoId) {
      replace('/')
    }

    let bread = await getBread(nanoId)

    if (!bread) {
      bread = await get(nanoId)

      if (!bread) {
        window.alert($errMsg)
        replace('/')
        return
      }

      setBread(bread)
    }

    if ($userNanoId === bread.userNanoId) {
      editMode = true

      $title = bread.title
      $image = bread.image
      $answers = bread.answers
      $isPublic = bread.isPublic
      $license = bread.license
      $source = bread.source
    } else {
      viewMode = true
    }
  })
</script>

{#if editMode}
  <Edit {nanoId} />
{/if}

{#if viewMode}
  <View />
{/if}
