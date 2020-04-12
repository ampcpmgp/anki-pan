<script>
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

  function onPlay() {
    playbackIndex = 0
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
</style>

<div class="breads-detail">
  <Title name={title} {userId} readOnly={true} errMsg="" />

  <div class="justify-center">
    <Controller
      noBack={true}
      noPlay={false}
      noNext={true}
      on:back={console.error}
      on:play={onPlay}
      on:next={console.error} />
  </div>

  <Image {image} editable={false} {answers} {playbackIndex} />
  <Footer {source} {license} />
</div>
