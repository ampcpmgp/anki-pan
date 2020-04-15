<script>
  import { push } from 'svelte-spa-router'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Footer from '../../parts/Bread/Footer'

  export let bread = {}

  const {
    nanoId,
    userNanoId,
    userId,
    title,
    image,
    answers,
    source,
    license,
  } = bread

  void (nanoId, userNanoId)

  let playbackIndex = -1
  let imageHeight = 0

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
  <Title
    value={title}
    {userId}
    readonly={true}
    errMsg=""
    on:homeClick={goHome} />

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
