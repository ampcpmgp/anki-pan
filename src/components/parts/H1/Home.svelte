<script>
  import favicon from '../../../favicon.svg'

  export let version
</script>

<style>
  h1 {
    color: green;
    display: inline-grid;
    align-items: end;
    grid-auto-flow: column;
    grid-column-gap: 12px;
    padding: 4px 8px;
    font-size: 26px;
    line-height: 26px;
  }

  img {
    height: 30px;
  }
</style>

<h1>
  <img src={favicon} alt="" />
  暗記パン v{version}
</h1>
