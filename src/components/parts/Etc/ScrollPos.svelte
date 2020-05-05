<script>
  import { onMount, tick } from 'svelte'
  import { default as sleep } from '../../../utils/sleep'

  export let scrollY = 0
  let isReady = false

  function init() {
    isReady = true
    window.scrollTo(0, scrollY)
  }

  function hasScrollHeight() {
    const scrollableY = document.body.scrollHeight - window.innerHeight

    return scrollableY >= scrollY
  }

  onMount(async () => {
    // 0ms, 10ms, 100ms, 1000ms の間で、DOMのロード時間を待つ
    await tick()
    if (hasScrollHeight()) {
      init()
      return
    }

    await sleep(10)
    if (hasScrollHeight()) {
      init()
      return
    }

    await sleep(100)
    if (hasScrollHeight()) {
      init()
      return
    }

    await sleep(1000)
    init()
  })

  function scroll() {
    if (!isReady) return

    scrollY = window.scrollY
  }
</script>

<svelte:window on:scroll={scroll} />
