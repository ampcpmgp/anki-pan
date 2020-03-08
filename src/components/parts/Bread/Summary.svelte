<script>
  import { createEventDispatcher } from 'svelte'
  import svg from '../../../images/一覧パン.svg'

  export let title
  export let userId
  export let breadId

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
    grid-row-gap: 10px;
    width: 240px;
    height: 240px;
    padding: 20px;
  }

  .title {
    align-self: end;
  }

  .author {
    font-size: 0.9em;
  }
</style>

<div class="bread" on:click={onClick} style="background-image: url({svg})">
  <div class="title">{title}</div>
  <div class="author">@{userId}</div>
</div>
