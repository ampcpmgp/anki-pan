<script>
  import { createEventDispatcher } from 'svelte'
  import H2 from '../../parts/H2/Home'
  import Summary from '../../parts/Bread/Summary'
  import Action from '../../parts/Text/Action'
  import { getColor } from '../../../utils/bread'

  export let type = 0
  export let items = []
  export let isLast = false

  const dispatch = createEventDispatcher()

  function readMore() {
    dispatch('readMore', {
      id: items[items.length - 1].id,
    })
  }
</script>

<style>
  .breads {
    margin-top: 10px;
    display: grid;
    justify-content: center;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, 200px);
  }

  .read-more {
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="wrapper">
  <H2 {type} />

  <div class="breads">
    {#each items as item}
      <Summary
        title={item.title}
        id={item.id}
        userId={item.userId}
        {type}
        on:click />
    {/each}

    {#if !isLast}
      <div class="read-more">
        <Action text="もっと見る" color={getColor(type)} on:click={readMore} />
      </div>
    {/if}
  </div>
</div>
