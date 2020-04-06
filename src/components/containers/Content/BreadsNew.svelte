<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import { bread } from '../../../../utils/validator'
  import License from '../../../../const/license'
  import { id, fetchAccount } from '../../../states/user'
  import { imgSrc } from '../../../states/user-input/bread-new'
  import { getList } from '../../../utils/license'
  import Size from '../../../const/size'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import DragDrop from '../../parts/Bread/DragDrop'
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

  // Firefox では、画像に1frを指定しても、そこにきちんとおさまりきらない画像
  // ( 240px-The_Earth_seen_from_Apollo_17.jpg 等) があったため、高さを
  // それぞれ計算し指定する。
  const LocalSize = {
    TITLE: 44,
    CONTROLLER: 36,
    FIRST_VIEW_ROW_GAP: 12,
  }

  onMount(async () => {
    await fetchAccount()

    if (!$id) {
      replace('/')
    }
  })

  function onDrop(e) {
    $imgSrc = e.detail
  }
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
    grid-template-rows: var(--title-height) var(--controller-height) 1fr;
    grid-row-gap: var(--row-gap);
    height: 100vh;
    padding-bottom: var(--padding-bottom);
  }

  .image-wrapper {
    height: calc(
      100vh - var(--title-height) - var(--controller-height) -
        var(--padding-bottom) - 2 * var(--row-gap)
    );
  }
</style>

<div class="breads-new">
  <div
    class="first-view"
    style="; --title-height: {LocalSize.TITLE}px; --controller-height: {LocalSize.CONTROLLER}px;
    --padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px; --row-gap: {LocalSize.FIRST_VIEW_ROW_GAP}px;
    ">
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

    {#if !$imgSrc}
      <DragDrop on:drop={onDrop} />
    {:else}
      <div
        class="image-wrapper"
        style=" --title-height: {LocalSize.TITLE}px; --controller-height: {LocalSize.CONTROLLER}px;
        --padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px; --row-gap: {LocalSize.FIRST_VIEW_ROW_GAP}px;
        ">
        <Image
          imgSrc={$imgSrc}
          editable={true}
          answers={[]}
          playbackIndex={-1} />
      </div>
    {/if}
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
    <Selectbox options={getList()} bind:value={license} />
  </div>

  <div class="justify-end">
    <Button
      text="パン作成"
      type="active"
      disabled={false}
      on:click={console.info} />
  </div>
</div>
