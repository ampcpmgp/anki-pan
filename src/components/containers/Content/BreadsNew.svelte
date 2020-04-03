<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import { bread } from '../../../../utils/validator'
  import License from '../../../../const/license'
  import { id, fetchAccount } from '../../../states/user'
  import { getList } from '../../../utils/license'
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
  let license = License.OTHER
  $: titleErrMsg = bread.title.getErrMsg(name)
  $: sourceErrMsg = source && bread.source.getErrMsg(source)

  onMount(async () => {
    await fetchAccount()

    if (!$id) {
      replace('/')
    }
  })
</script>

<style>
  .breads-new {
    display: grid;
    grid-row-gap: 14px;
    padding: 8px 0;
    margin-bottom: 60px;
  }

  .justify-start {
    justify-self: start;
  }
  .justify-center {
    justify-self: center;
  }
  .justify-end {
    justify-self: end;
  }

  .first-view {
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-row-gap: 12px;
    height: 100vh;
    padding-bottom: var(--padding-bottom);
  }
</style>

<div class="breads-new">
  <div
    class="first-view"
    style="--padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px">
    <Title
      bind:value={name}
      userId={$id}
      readOnly={true}
      errMsg={titleErrMsg} />

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

  <div class="justify-start">
    <Checkbox label="公開する" checked={isPublic} />
  </div>

  <div class="justify-start">
    <Text
      label="出典元URL"
      bind:value={source}
      placeholder=""
      errMsg={sourceErrMsg} />
  </div>

  <div class="justify-start">
    <Selectbox options={getList()} value={license} />
  </div>

  <div class="justify-end">
    <Button
      text="パン作成"
      type="active"
      disabled={false}
      on:click={console.info} />
  </div>
</div>
