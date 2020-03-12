<script>
  import { createEventDispatcher } from 'svelte'
  import feather from 'feather-icons'

  const dispatch = createEventDispatcher()

  function onBack() {
    dispatch('back')
  }
  function onPlay() {
    dispatch('play')
  }
  function onNext() {
    dispatch('next')
  }

  const svg = {
    play: feather.icons['play'].toSvg({
      stroke: '#555',
      width: 26,
      height: 'auto',
    }),
    chevronsLeft: feather.icons['chevrons-left'].toSvg({
      stroke: '#555',
      width: 26,
      height: 'auto',
    }),
    chevronsRight: feather.icons['chevrons-right'].toSvg({
      stroke: '#555',
      width: 26,
      height: 'auto',
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

  .icon:hover {
    transform: translate(1px, 1px);
  }

  .icon:active {
    transform: translate(2px, 2px);
  }
</style>

<div class="wrapper">
  <div on:click={onBack} class="icon">
    {@html svg.chevronsLeft}
  </div>
  <div on:click={onPlay} class="icon">
    {@html svg.play}
  </div>
  <div on:click={onNext} class="icon">
    {@html svg.chevronsRight}
  </div>
</div>
