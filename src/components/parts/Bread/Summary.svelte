<script>
  import { createEventDispatcher } from 'svelte'
  import { getFrameBase64 } from '../../../utils/bread'

  export let title = ''
  export let userId = 0
  export let breadId = ''
  export let type = 0

  const dispatch = createEventDispatcher()

  function onClick() {
    dispatch('click', {
      breadId,
    })
  }
</script>

<style>
  .bread {
    background-size: contain;
    display: inline-grid;
    justify-content: center;
    grid-row-gap: 30px;
    width: 240px;
    height: 240px;
    padding: 20px;
  }

  .title {
    align-self: end;
    font-weight: bold;
    color: #333;
    margin: 0 auto;
  }

  .author {
    font-size: 0.9em;
    margin: 0 auto;
  }
</style>

<div
  class="bread"
  on:click={onClick}
  style="background-image: url({getFrameBase64(type)})">
  <div class="title">{title}</div>
  <div class="author">@{userId}</div>
</div>
