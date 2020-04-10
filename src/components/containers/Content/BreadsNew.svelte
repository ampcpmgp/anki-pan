<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import arrayMove from 'array-move'
  import { bread } from '../../../../utils/validator'
  import { id, nanoId, fetchAccount } from '../../../states/user'
  import {
    title,
    image,
    answers,
    isPublic,
    license,
    source,
  } from '../../../states/user-input/bread-new'
  import { bake, bakedErrMsg } from '../../../states/user-bread'
  import { success } from '../../../states/alert'
  import { reset } from '../../../states/breads-summary/latest'
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

  let playbackIndex = -1
  let buttonDisabled = false
  $: titleErrMsg = bread.title.getErrMsg($title)
  $: sourceErrMsg = bread.source.getErrMsg($source)
  $: answersErrMsg = bread.answers.getErrMsg($answers)

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

    if (!$nanoId) {
      replace('/')
    }
  })

  function onDrop(e) {
    $image = e.detail
  }

  function onPlay() {
    playbackIndex = 0
  }

  function onAnswerUpdate(e) {
    const { answer, index, newIndex } = e.detail

    $answers[index] = answer

    arrayMove($answers, index, newIndex)
    $answers = $answers.filter(answer => answer)
  }
  function onAnswerCreate(e) {
    const { answer, newIndex } = e.detail

    $answers.splice(newIndex, 0, answer)
    $answers = $answers.filter(answer => answer)
  }
  function onAnswerDelete(e) {
    const { index } = e.detail
    $answers.splice(index, 1)
  }
  function onAnswerNext() {
    ++playbackIndex
  }
  function onAnswerEnd() {}

  async function createBread() {
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

    await bake({
      title: $title,
      image: $image,
      answers: $answers,
      isPublic: $isPublic,
      source: $source,
      license: $license,
    })

    buttonDisabled = false

    if (!$bakedErrMsg) {
      replace('/')
      $success = 'パン作成成功!!'
      reset()
    }
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
    z-index: 1;
    height: calc(
      100vh - var(--title-height) - var(--controller-height) -
        var(--padding-bottom) - 2 * var(--row-gap)
    );
  }

  .error {
    color: red;
  }
</style>

<div class="breads-new">
  <div
    class="first-view"
    style="--title-height: {LocalSize.TITLE}px; --controller-height: {LocalSize.CONTROLLER}px;
    --padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px; --row-gap: {LocalSize.FIRST_VIEW_ROW_GAP}px;
    ">
    <Title
      bind:value={$title}
      userId={$id}
      readonly={false}
      errMsg={titleErrMsg} />

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
      <div
        class="image-wrapper"
        style=" --title-height: {LocalSize.TITLE}px; --controller-height: {LocalSize.CONTROLLER}px;
        --padding-bottom: {Size.BREADS_DETAIL_FOOTER_HEIGHT}px; --row-gap: {LocalSize.FIRST_VIEW_ROW_GAP}px;
        ">
        <Image
          image={$image}
          editable={true}
          answers={$answers}
          {playbackIndex}
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
      text="パン作成"
      active
      disabled={buttonDisabled}
      on:click={createBread} />

    {#if $bakedErrMsg}
      <p class="error">{$bakedErrMsg}</p>
    {/if}
  </div>
</div>
