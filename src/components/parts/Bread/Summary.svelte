<script>
  import { createEventDispatcher } from 'svelte'
  import svgNew from '../../../images/一覧パン_new.svg'
  import svgFavorite from '../../../images/一覧パン_favorite.svg'
  import svgSelfMade from '../../../images/一覧パン_self_made.svg'
  import svgCache from '../../../images/一覧パン_cache.svg'
  import BreadType from '../../../const/BreadType'

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

  function getSvg() {
    switch (type) {
      case BreadType.NEW:
        return svgNew
      case BreadType.FAVORITE:
        return svgFavorite
      case BreadType.SELF_MADE:
        return svgSelfMade
      case BreadType.CACHE:
        return svgCache
      default:
        console.error(`not found BreadType: ${type}`)
    }
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

<div class="bread" on:click={onClick} style="background-image: url({getSvg()})">
  <div class="title">{title}</div>
  <div class="author">@{userId}</div>
</div>
