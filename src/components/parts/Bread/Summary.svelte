<script>
  import { link } from 'svelte-spa-router'
  import { getFrameBase64 } from '../../../utils/bread'

  export let title = ''
  export let userId = 0
  export let nanoId = ''
  export let type = 0
</script>

<style>
  .bread {
    background-size: contain;
    display: inline-grid;
    justify-content: center;
    grid-row-gap: 30px;
    width: 200px;
    height: 200px;
    padding: 40px 20px 20px;
    text-decoration: none;
    color: initial;
  }

  .title {
    align-self: start;
    font-weight: bold;
    color: #333;
    margin: 0 auto;
  }

  .author {
    font-size: 0.9em;
    margin: 0 auto;
  }
</style>

<a
  class="bread"
  href="/breads/detail/{nanoId}"
  use:link
  style="background-image: url({getFrameBase64(type)})">
  <div class="title">{title}</div>
  <div class="author">@{userId}</div>
</a>
