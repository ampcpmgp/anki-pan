<script>
  import { createEventDispatcher } from 'svelte'
  import { getFrameBase64 } from '../../../utils/bread-summary'

  export let title
  export let userId
  export let breadId
  export let type

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
    width: 240px;
    height: 240px;
    padding: 60px 20px 40px 20px;
  }

  .title {
    align-self: start;
    font-weight: bold;
    color: #333;
    margin: 0 auto;
  }

  .author {
    align-self: end;
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
