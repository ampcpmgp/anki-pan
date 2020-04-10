<script>
  import Frame from '../containers/Frame/Frame'
  import Branch from '../containers/BreadsDetail/Branch'

  export let params = {}
</script>

<Frame>
  <Branch nanoId={params.nanoId} />
</Frame>
