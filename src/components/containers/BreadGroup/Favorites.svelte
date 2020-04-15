<script>
  import BreadType from '../../../const/bread-type'
  import Group from '../../parts/Bread/Group'
</script>

<Group
  type={BreadType.FAVORITES}
  items={[]}
  description="工事中"
  showReadMore={false}
  isReading={false}
  on:click={console.info}
  on:readMore={console.info} />
