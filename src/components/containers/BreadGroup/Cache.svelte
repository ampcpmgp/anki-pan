<script>
  import { onMount } from 'svelte'
  import { SIZE } from '../../../../const/pager'
  import BreadType from '../../../const/bread-type'
  import { getBreads } from '../../../utils/idb'
  import { moveBreadDetail } from '../../../utils/router'
  import Group from '../../parts/Bread/Group'

  let isReading = false
  let offsetFromLast = 0
  let items = []
  let nextBreads = []
  let showReadMore = true

  async function fetchBreads() {
    let breads = []

    if (nextBreads.length > 0) {
      breads = nextBreads
      nextBreads = []
    } else {
      breads = await getBreads(offsetFromLast)
    }

    if (breads.length === 0) {
      return
    }

    items = [...items, ...breads]

    offsetFromLast += SIZE

    nextBreads = await getBreads(offsetFromLast)
    showReadMore = nextBreads.length > 0
  }

  onMount(() => {
    fetchBreads()
  })

  async function onReadMore() {
    isReading = true
    await fetchBreads()
    isReading = false
  }
</script>

<Group
  type={BreadType.CACHE}
  {items}
  {showReadMore}
  description="パン詳細画面を開くと、IndexedDB
  を通してブラウザに保存されます。共有端末をご利用の方で、閲覧済みキャッシュを見られて困る方は、プライベートウィンドウでご利用ください。"
  {isReading}
  on:click={moveBreadDetail}
  on:readMore={onReadMore} />
