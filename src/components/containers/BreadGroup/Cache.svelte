<script>
  import BreadType from '../../../const/bread-type'
  import {
    items,
    showReadMore,
    fetch,
    fetchReadMore,
  } from '../../../states/breads-summary/cache'
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
  type={BreadType.CACHE}
  items={$items}
  showReadMore={$showReadMore}
  description="パン詳細画面を開くと、IndexedDB
  を通してブラウザに保存されます。共有端末をご利用の方で、閲覧済みキャッシュを見られて困る方は、プライベートウィンドウでご利用ください。"
  {isReading}
  on:readMore={onReadMore} />
