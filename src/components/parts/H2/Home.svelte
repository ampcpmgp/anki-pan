<script>
  import BreadType from '../../../const/bread-type'
  import { getColor } from '../../../utils/bread'
  export let type = 0

  function getText() {
    switch (type) {
      case BreadType.NEW:
        return '最新'
      case BreadType.FAVORITES:
        return 'お気に入り'
      case BreadType.SELF_MADE:
        return '自作'
      case BreadType.CACHE:
        return 'キャッシュ (30日後に削除されます)'
      default:
        console.error(`getText type: ${type}`)
        break
    }
  }
</script>

<style>
  h2 {
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 4px;
    font-size: 20px;
    color: var(--color);
  }

  h2:before,
  h2:after {
    content: '';
    width: 24px;
    height: 1px;
    background-color: var(--color);
  }
</style>

<h2 style="--color: {getColor(type)}">{getText(type)}</h2>
