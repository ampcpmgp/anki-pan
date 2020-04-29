<script>
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import cloneDeep from 'lodash.clonedeep'
  import { nanoId as selfNanoId } from '../../../states/user'
  import {
    bread,
    errMsg,
    fromWhere,
    fetchFromServer,
    isFavorite,
    fetchFavorite,
    toggleFavorite,
  } from '../../../states/bread-detail'
  import { isSame } from '../../../utils/bread'
  import * as idb from '../../../utils/idb'
  import FromWhere from '../../../const/from-where'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Operation from '../../parts/Bread/Operation'
  import Footer from '../../parts/Bread/Footer'

  $: nanoId = $bread.nanoId
  $: userNanoId = $bread.userNanoId
  $: userId = $bread.userId
  $: title = $bread.title
  $: image = $bread.image
  $: answers = $bread.answers
  $: source = $bread.source
  $: license = $bread.license

  let playbackIndex = -1
  let imageHeight = 0
  let isRefreshing = false
  let isFavoriting = false

  $: disabledSkipBack = playbackIndex === -1
  $: isPlaying = playbackIndex > -1

  onMount(async () => {
    if (!$selfNanoId) {
      return
    }

    if ($fromWhere !== FromWhere.SERVER) {
      return
    }

    const existsFavorite = await idb.existsFavorite($selfNanoId, nanoId)

    if (existsFavorite) {
      return
    }

    await fetchFavorite(nanoId)
  })

  function onPlay() {
    playbackIndex = 0
  }

  function onAnswerNext() {
    ++playbackIndex
  }

  function onAnswerEnd() {}

  function goHome() {
    push('/')
  }

  async function onRefresh() {
    const oldBread = cloneDeep($bread)
    isRefreshing = true
    await fetchFromServer(nanoId)

    if (!$bread) {
      isRefreshing = false
      alert($errMsg)
      return
    }

    if (isSame(oldBread, $bread)) {
      isRefreshing = false
      alert('変更はありません')
      return
    }

    idb.updateBread(nanoId, $bread)

    isRefreshing = false
    alert('最新パンを取得しました')
  }

  async function onFavorite(e) {
    isFavoriting = true
    $isFavorite = !$isFavorite

    const isSuccess = await toggleFavorite(e.detail.isFavorite).catch(alert)

    if (isSuccess) {
      // Do nothing
    } else {
      $isFavorite = !$isFavorite
    }

    isFavoriting = false
  }
</script>

<style>
  .breads-detail {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    grid-row-gap: 12px;
    height: 100vh;
  }
  .justify-center {
    justify-self: center;
  }

  .title-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-column-gap: 12px;
  }

  .image-wrapper {
    z-index: 1;
    /* これがあると resize 時にも能動的に調整してくれる。 */
    overflow-y: auto;
    scrollbar-width: none;
  }
  .image-wrapper::-webkit-scrollbar {
    width: 0;
  }
</style>

<div class="breads-detail">
  <div class="title-wrapper">
    <Title
      value={title}
      {userId}
      readonly={true}
      errMsg=""
      on:homeClick={goHome} />

    <Operation
      visibleFavorite={!!$selfNanoId}
      isFavorite={$isFavorite}
      disabledFavorite={isFavoriting}
      disabledRefresh={isRefreshing || $fromWhere === FromWhere.SERVER}
      fromWhere={$fromWhere}
      on:refresh={onRefresh}
      on:favorite={onFavorite} />
  </div>

  <div class="justify-center">
    <Controller
      disabledBack={true}
      {disabledSkipBack}
      disabledPlay={false}
      disabledNext={true}
      {isPlaying}
      on:back={console.error}
      on:play={onPlay}
      on:next={console.error} />
  </div>

  <div class="image-wrapper" bind:clientHeight={imageHeight}>
    <Image
      {image}
      editable={false}
      {answers}
      {playbackIndex}
      height={imageHeight}
      on:next={onAnswerNext}
      on:end={onAnswerEnd} />
  </div>

  <Footer {source} {license} />
</div>
