<script>
  import { replace, push } from 'svelte-spa-router'
  import feather from 'feather-icons'
  import { bread } from '../../../../utils/validator'
  import { id } from '../../../states/user'
  import {
    title,
    image,
    answers,
    isPublic,
    license,
    source,
    getBread,
  } from '../../../states/user-input/bread-edit'
  import { fetch, errMsg } from '../../../states/bread-detail'
  import { update, updatedErrMsg } from '../../../states/user-bread'
  import { success } from '../../../states/alert'
  import { reset } from '../../../states/breads-summary'
  import { getList } from '../../../utils/license'
  import * as answersUtil from '../../../utils/answers'
  import * as db from '../../../utils/db'
  import { isSame } from '../../../utils/bread'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import DragDrop from '../../parts/Bread/DragDrop'
  import Checkbox from '../../parts/Form/Checkbox'
  import Text from '../../parts/Form/Text'
  import Selectbox from '../../parts/Form/Selectbox'
  import Button from '../../parts/Form/Button'

  export let nanoId = ''

  let playbackIndex = -1
  let imageHeight = 0
  let buttonDisabled = false
  let isRefreshing = false
  $: titleErrMsg = bread.title.getErrMsg($title)
  $: sourceErrMsg = bread.source.getErrMsg($source)
  $: answersErrMsg = bread.answers.getErrMsg($answers)

  const svg = {
    refreshCw: feather.icons['refresh-cw'].toSvg({
      width: '24px',
      height: '24px',
      stroke: '#555',
    }),
  }

  function onDrop(e) {
    $image = e.detail
  }

  function onPlay() {
    playbackIndex = 0
  }

  function onAnswerCreate(e) {
    $answers = answersUtil.create($answers, e.detail)
  }
  function onAnswerUpdate(e) {
    $answers = answersUtil.update($answers, e.detail)
  }
  function onAnswerDelete(e) {
    $answers = answersUtil.remove($answers, e.detail)
  }

  function onAnswerNext() {
    ++playbackIndex
  }
  function onAnswerEnd() {
    playbackIndex = -1
  }

  async function updateBread() {
    if (!$title) {
      window.alert('タイトル名が入力されていません。')
      return
    }

    if (titleErrMsg) {
      window.alert('タイトル名にエラーが出ています。')
      return
    }

    if (!$image) {
      window.alert('画像が設定されていません。')
      return
    }

    if ($answers.length === 0) {
      window.alert('回答が入力されていません。')
      return
    }

    if (answersErrMsg) {
      window.alert(answersErrMsg)
      return
    }

    if (sourceErrMsg) {
      window.alert('出典元URLにエラーが出ています。')
      return
    }

    buttonDisabled = true

    const bread = getBread(nanoId)

    await update(bread)

    buttonDisabled = false

    if (!$updatedErrMsg) {
      replace('/')
      $success = 'パン更新成功'
      reset()

      db.updateBread(nanoId, bread)
    }
  }

  function goHome() {
    push('/')
  }

  async function refresh() {
    isRefreshing = true
    const bread = await fetch(nanoId)

    if (!bread) {
      isRefreshing = false
      alert($errMsg)
      return
    }

    if (isSame(getBread(nanoId), bread)) {
      alert('変更はありません')
      isRefreshing = false
      return
    }

    $title = bread.title
    $image = bread.image
    $answers = bread.answers
    $isPublic = bread.isPublic
    $license = bread.license
    $source = bread.source

    db.updateBread(nanoId, bread)

    isRefreshing = false
    alert('最新パンに更新します')
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
    grid-template-rows: auto auto 1fr;
    grid-row-gap: 12px;
    height: 100vh;
    padding-bottom: 40px;
  }

  .title-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-column-gap: 12px;
  }

  .refresh {
    cursor: pointer;
  }

  .refresh.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .image-wrapper {
    z-index: 1;
    /* これがあると resize 時にも能動的に調整してくれる。 */
    overflow-y: auto;
    scrollbar-width: none;
  }
  .image-wrapper::-webkit-scrollbar {
    width: 0;
  }

  .error {
    color: red;
  }
</style>

<div class="breads-new">
  <div class="first-view">
    <div class="title-wrapper">
      <Title
        bind:value={$title}
        userId={$id}
        readonly={false}
        errMsg={titleErrMsg}
        on:homeClick={goHome} />

      <div class="refresh" class:disabled={isRefreshing} on:click={refresh}>
        {@html svg.refreshCw}
      </div>
    </div>

    <div class="justify-center">
      <Controller
        noBack={true}
        noPlay={false}
        noNext={true}
        on:back={console.error}
        on:play={onPlay}
        on:next={console.error} />
    </div>

    {#if !$image}
      <DragDrop on:drop={onDrop} />
    {:else}
      <div class="image-wrapper" bind:clientHeight={imageHeight}>
        <Image
          image={$image}
          editable={true}
          answers={$answers}
          {playbackIndex}
          height={imageHeight}
          on:answerUpdate={onAnswerUpdate}
          on:answerCreate={onAnswerCreate}
          on:answerDelete={onAnswerDelete}
          on:next={onAnswerNext}
          on:end={onAnswerEnd} />
      </div>
    {/if}
  </div>

  <div class="justify-start">
    <Checkbox label="公開する" bind:checked={$isPublic} />
  </div>

  <div class="justify-start">
    <Text
      label="出典元URL"
      bind:value={$source}
      placeholder=""
      errMsg={sourceErrMsg} />
  </div>

  <div class="justify-start">
    <Selectbox options={getList()} bind:value={$license} />
  </div>

  <div class="justify-end">
    <Button
      text="パン更新"
      active
      disabled={buttonDisabled}
      on:click={updateBread} />

    {#if $updatedErrMsg}
      <p class="error">{$updatedErrMsg}</p>
    {/if}
  </div>
</div>
