<script>
  import { createEventDispatcher } from 'svelte'
  import feather from 'feather-icons'

  export let disabledPrev = false
  export let disabledSkipBack = false
  export let disabledPlay = false
  export let disabledNext = false
  export let isPlaying = false

  const dispatch = createEventDispatcher()

  function onPrev() {
    dispatch('prev')
  }
  function onSkipBack() {
    dispatch('skipBack')
  }
  function onPause() {
    dispatch('pause')
  }
  function onPlay() {
    dispatch('play')
  }
  function onNext() {
    dispatch('next')
  }

  const svg = {
    skipBack: feather.icons['skip-back'].toSvg({
      stroke: '#555',
      width: 26,
      height: 26,
    }),
    play: feather.icons['play'].toSvg({
      stroke: '#555',
      width: 26,
      height: 26,
    }),
    pause: feather.icons['pause'].toSvg({
      stroke: '#555',
      width: 26,
      height: 26,
    }),
    chevronsLeft: feather.icons['chevrons-left'].toSvg({
      stroke: '#555',
      width: 26,
      height: 26,
    }),
    chevronsRight: feather.icons['chevrons-right'].toSvg({
      stroke: '#555',
      width: 26,
      height: 26,
    }),
  }
</script>

<style>
  .wrapper {
    display: inline-grid;
    grid-auto-flow: column;
    border: solid 1px #555;
    padding: 4px;
    border-radius: 4px;
  }

  .icon {
    display: grid;
    align-items: center;
    cursor: pointer;
    padding: 0 4px;
  }

  .icon.disabled {
    pointer-events: none;
    cursor: initial;
    opacity: 0.1;
  }

  .icon:hover {
    transform: translate(1px, 1px);
  }

  .icon:active {
    transform: translate(2px, 2px);
  }
</style>

<div class="wrapper">
  <div on:click={onPrev} class="icon" class:disabled={disabledPrev}>
    {@html svg.chevronsLeft}
  </div>

  <div on:click={onSkipBack} class="icon" class:disabled={disabledSkipBack}>
    {@html svg.skipBack}
  </div>

  {#if isPlaying}
    <div on:click={onPause} class="icon" class:disabled={disabledPlay}>
      {@html svg.pause}
    </div>
  {:else}
    <div on:click={onPlay} class="icon" class:disabled={disabledPlay}>
      {@html svg.play}
    </div>
  {/if}
  <div on:click={onNext} class="icon" class:disabled={disabledNext}>
    {@html svg.chevronsRight}
  </div>
</div>
