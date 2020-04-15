<script>
  import { createEventDispatcher } from 'svelte'
  import fether from 'feather-icons'

  export let value = ''
  export let userId = ''
  export let readonly = false
  export let errMsg = ''

  const dispatch = createEventDispatcher()

  const svg = {
    home: fether.icons['home'].toSvg({
      width: '36px',
      height: '36px',
      'stroke-width': 1,
      stroke: 'orangered',
    }),
  }

  function onHomeClick() {
    dispatch('homeClick')
  }
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-areas:
      'a b b'
      'a c d';
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 8px;
  }

  .icon-wrapper {
    grid-area: a;
    cursor: pointer;
    display: grid;
    align-items: center;
  }

  input {
    grid-area: b;
    border: none;
    border-bottom: solid 1px forestgreen;
    color: forestgreen;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-id {
    font-size: 12px;
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: dimgrey;
  }

  .error {
    color: orangered;
  }
</style>

<div class="wrapper">
  <div on:click={onHomeClick} class="icon-wrapper">
    {@html svg.home}
  </div>

  <input type="text" placeholder="タイトル名" bind:value {readonly} />
  <div class="user-id">@{userId}</div>

  {#if errMsg}
    <div class="error">{errMsg}</div>
  {/if}
</div>
