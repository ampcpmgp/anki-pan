<script>
  import BreadType from '../../../const/bread-type'
  import {
    fetch,
    fetchReadMore,
    existsAfter,
    items,
  } from '../../../states/breads-summary/favorites'
  import Group from '../../parts/Bread/Group'

  let isReading = false

  fetch()

  async function onReadMore() {
    isReading = true
    await fetchReadMore()
    isReading = false
  }
</script>

<Group
  type={BreadType.FAVORITES}
  items={$items}
  showReadMore={$existsAfter}
  description=""
  {isReading}
  on:readMore={onReadMore} />
