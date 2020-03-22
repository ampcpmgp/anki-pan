<script>
  import BreadType from '../../../const/bread-type'
  import {
    fetch,
    fetchReadMore,
    existsAfter,
    items,
  } from '../../../states/bread-new'
  import { moveBreadDetail } from '../../../utils/router'
  import Group from '../../parts/Bread/Group'

  fetch()
</script>

<Group
  type={BreadType.NEW}
  items={$items}
  showReadMore={$existsAfter}
  on:click={moveBreadDetail}
  on:readMore={fetchReadMore} />
