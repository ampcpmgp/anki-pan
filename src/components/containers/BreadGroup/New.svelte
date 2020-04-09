<script>
  import BreadType from '../../../const/bread-type'
  import {
    fetch,
    fetchReadMore,
    existsAfter,
    items,
  } from '../../../states/breads-summary/latest'
  import { moveBreadDetail } from '../../../utils/router'
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
  type={BreadType.NEW}
  items={$items}
  showReadMore={$existsAfter}
  {isReading}
  on:click={moveBreadDetail}
  on:readMore={onReadMore} />
