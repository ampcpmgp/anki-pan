<script>
  import { push } from 'svelte-spa-router'
  import feather from 'feather-icons'
  import { nanoId as selfNanoId } from '../../../states/user'
  import { fetch, errMsg, isHeart } from '../../../states/bread-detail'
  import { isSame } from '../../../utils/bread'
  import * as db from '../../../utils/db'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Footer from '../../parts/Bread/Footer'

  export let bread = {}

  $: nanoId = bread.nanoId
  $: userNanoId = bread.userNanoId
  $: userId = bread.userId
  $: title = bread.title
  $: image = bread.image
  $: answers = bread.answers
  $: source = bread.source
  $: license = bread.license

  let playbackIndex = -1
  let imageHeight = 0
  let isRefreshing = false
  let isHearting = false

  const svg = {
    refreshCw: feather.icons['refresh-cw'].toSvg({
      width: '24px',
      height: '24px',
      stroke: '#555',
    }),
    heartActive: feather.icons.heart.toSvg({
      width: '24px',
      height: '24px',
      stroke: 'hotpink',
      fill: 'hotpink',
    }),
    heartInactive: feather.icons.heart.toSvg({
      width: '24px',
      height: '24px',
      stroke: '#ccc',
    }),
  }

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

  async function refresh() {
    isRefreshing = true
    const newBread = await fetch(nanoId)

    if (!newBread) {
      isRefreshing = false
      alert($errMsg)
      return
    }

    if (isSame(bread, newBread)) {
      alert('変更はありません')
      isRefreshing = false
      return
    }

    title = newBread.title
    image = newBread.image
    answers = newBread.answers
    license = newBread.license
    source = newBread.source

    db.updateBread(nanoId, newBread)

    isRefreshing = false
    alert('最新パンに更新します')
  }

  async function removeHeart() {}

  async function attachHeart() {
    // isHearting = true
    // const bread = await fetch(nanoId)
    // if (!bread) {
    //   isHearting = false
    //   alert($errMsg)
    //   return
    // }
    // if (isSame(getBread(nanoId), bread)) {
    //   alert('変更はありません')
    //   isHearting = false
    //   return
    // }
    // isHearting = false
    // alert('最新パンに更新します')
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
    grid-template-columns: 1fr auto auto;
    align-items: center;
    grid-column-gap: 12px;
  }

  .icon {
    cursor: pointer;
  }

  .icon.disabled {
    pointer-events: none;
    opacity: 0.3;
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

    <div class="icon" class:disabled={isRefreshing} on:click={refresh}>
      {@html svg.refreshCw}
    </div>

    {#if $selfNanoId}
      {#if $isHeart}
        <div class="icon" class:disabled={isHearting} on:click={removeHeart}>
          {@html svg.heartActive}
        </div>
      {:else}
        <div class="icon" class:disabled={isHearting} on:click={attachHeart}>
          {@html svg.heartInactive}
        </div>
      {/if}
    {/if}
  </div>

  <div class="justify-center">
    <Controller
      noBack={true}
      noPlay={false}
      noNext={true}
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
