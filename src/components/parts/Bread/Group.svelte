<script>
  import { createEventDispatcher } from 'svelte'
  import H2 from '../../parts/H2/Home'
  import Summary from '../../parts/Bread/Summary'
  import Action from '../../parts/Text/Action'
  import { getColor } from '../../../utils/bread'

  export let type = 0
  export let items = []
  export let showReadMore = true
  export let description = ''

  const dispatch = createEventDispatcher()

  function readMore() {
    dispatch('readMore')
  }
</script>

<style>
  .wrapper {
    min-height: 120px;
  }

  .breads {
    margin-top: 10px;
    display: grid;
    justify-content: center;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, 200px);
  }

  .read-more {
    padding: 40px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="wrapper">
  <H2 {type} />

  <p style="color: {getColor(type)}">{description}</p>

  {#if items.length > 0}
    <div class="breads">
      {#each items as item}
        <Summary
          title={item.title}
          nanoId={item.nanoId}
          userId={item.userId}
          {type}
          on:click />
      {/each}

      {#if showReadMore}
        <div class="read-more">
          <Action
            text="もっと見る"
            color={getColor(type)}
            on:click={readMore} />
        </div>
      {/if}
    </div>
  {/if}
</div>
