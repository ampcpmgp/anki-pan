<script>
  import { createEventDispatcher } from 'svelte'
  import feather from 'feather-icons'
  import { default as FromWhere } from '../../../const/from-where'

  export let visibleFavorite = true
  export let isFavorite = false
  export let disabledFavorite = true
  export let disabledRefresh = true
  export let fromWhere = FromWhere.UNKNOWN

  let fromWhereText = ''

  $: if (fromWhere === FromWhere.IDB) {
    fromWhereText = 'キャッシュ'
  }
  $: if (fromWhere === FromWhere.SERVER) {
    fromWhereText = '最新'
  }

  const dispatch = createEventDispatcher()

  function refresh() {
    dispatch('refresh')
  }
  function favorite() {
    dispatch('favorite', {
      isFavorite: !isFavorite,
    })
  }

  const svg = {
    refreshCw: feather.icons['refresh-cw'].toSvg({
      width: '24px',
      height: '24px',
      stroke: '#777',
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
      stroke: '#777',
    }),
  }
</script>

<style>
  .wrapper {
    display: inline-grid;
    justify-content: center;
    align-items: center;
  }

  .icon-wrapper {
    display: inline-grid;
    justify-content: center;
    grid-auto-flow: column;
    grid-column-gap: 12px;
    padding-bottom: 2px;
  }

  .icon {
    cursor: pointer;
    display: grid;
  }
  .icon.disabled {
    pointer-events: none;
    opacity: 0.1;
  }

  .status-text {
    justify-self: center;

    display: inline-grid;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    padding: 0px 2px;
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
  }
  .status-text.server {
    color: rgb(255, 81, 0);
    border-color: rgb(255, 81, 0);
  }
  .status-text.idb {
    color: orange;
    border-color: orange;
  }
</style>

<div class="wrapper">
  <div class="icon-wrapper">
    <div class="icon" class:disabled={disabledRefresh} on:click={refresh}>
      {@html svg.refreshCw}
    </div>

    {#if visibleFavorite}
      {#if isFavorite}
        <div class="icon" class:disabled={disabledFavorite} on:click={favorite}>
          {@html svg.heartActive}
        </div>
      {:else}
        <div class="icon" class:disabled={disabledFavorite} on:click={favorite}>
          {@html svg.heartInactive}
        </div>
      {/if}
    {/if}
  </div>

  <p
    class="status-text"
    class:idb={fromWhere === FromWhere.IDB}
    class:server={fromWhere === FromWhere.SERVER}>
    {fromWhereText}
  </p>
</div>
