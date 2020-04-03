<script>
  import { id } from '../../../states/user'
  import Size from '../../../const/size'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Checkbox from '../../parts/Form/Checkbox'
  import Text from '../../parts/Form/Text'
  import Selectbox from '../../parts/Form/Selectbox'
  import Button from '../../parts/Form/Button'

  let name = ''
  let isPublic = false
  let source = ''
</script>

<style>
  .breads-new {
    display: grid;
  }

  .justify-center {
    justify-self: center;
  }

  .first-view {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100vh;
    padding-bottom: var(--padding-bottom);
  }
</style>

<div class="breads-new">
  <div
    class="first-view"
    style="--padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px">
    <Title {name} userId={$id} readOnly={true} errMsg="" />

    <div class="justify-center">
      <Controller
        noBack={true}
        noPlay={false}
        noNext={true}
        back={console.info}
        play={console.info}
        next={console.info} />
    </div>

    <Image imgSrc="" editable={true} answers={[]} playbackIndex={-1} />
  </div>

  <Checkbox label="公開する" checked={isPublic} />
  <Text label="出典元URL" value={source} placeholder="" errMsg="" />
  <Selectbox options={[]} value="" />
  <Button text="" type="" disabled={false} on:click={console.info} />
</div>
