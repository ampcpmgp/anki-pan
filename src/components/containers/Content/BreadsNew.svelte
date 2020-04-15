<script>
  import { onMount } from 'svelte'
  import { replace, push } from 'svelte-spa-router'
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
  import * as answersUtil from '../../../utils/answers'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import DragDrop from '../../parts/Bread/DragDrop'
  import Checkbox from '../../parts/Form/Checkbox'
  import Text from '../../parts/Form/Text'
  import Selectbox from '../../parts/Form/Selectbox'
  import Button from '../../parts/Form/Button'

  let playbackIndex = -1
  let imageHeight = 0
  let buttonDisabled = false
  $: titleErrMsg = bread.title.getErrMsg($title)
  $: sourceErrMsg = bread.source.getErrMsg($source)
  $: answersErrMsg = bread.answers.getErrMsg($answers)

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

  function goHome() {
    push('/')
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
    <Title
      bind:value={$title}
      userId={$id}
      readonly={false}
      errMsg={titleErrMsg}
      on:homeClick={goHome} />

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
      text="パン作成"
      active
      disabled={buttonDisabled}
      on:click={createBread} />

    {#if $bakedErrMsg}
      <p class="error">{$bakedErrMsg}</p>
    {/if}
  </div>
</div>
