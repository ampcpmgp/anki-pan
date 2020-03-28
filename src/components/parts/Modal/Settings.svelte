<script>
  import Frame from './Frame'

  export let userId = ''
  let currentTabIndex = 0
  let tabs = [{ name: '一般' }, { name: '工事中' }]

  function onTabChange(selectedIndex) {
    currentTabIndex = selectedIndex
  }
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: auto auto 1fr;
    min-width: 640px;
    height: 90vh;
    max-height: 600px;
  }

  header {
    background-color: dimgray;
    color: white;
    padding: 8px 16px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .tab {
    background-color: white;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    border-bottom: solid 1px #aaa;
  }

  .tab li {
    padding: 8px 16px;
    margin-bottom: -1px;
    cursor: pointer;
  }
  .tab .current {
    border-bottom: solid 2px orangered;
  }

  .content {
    overflow-y: scroll;
    padding: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    background-color: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  dt {
    font-weight: bold;
  }
</style>

<Frame on:click>
  <div class="wrapper">
    <header>設定</header>

    <ul class="tab">
      {#each tabs as tab, i}
        <li
          class:current={i === currentTabIndex}
          on:click={() => onTabChange(i)}>
          {tab.name}
        </li>
      {/each}
    </ul>

    {#if currentTabIndex === 0}
      <dl class="content">
        <dt>ユーザーID</dt>
        <dd>{userId}</dd>
      </dl>
    {:else if currentTabIndex === 1}
      <dl class="content">
        <dt>再生速度など</dt>
        <dd>工事中</dd>
      </dl>
    {/if}
  </div>
</Frame>
