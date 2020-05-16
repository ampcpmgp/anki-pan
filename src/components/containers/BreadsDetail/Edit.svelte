<script>
  import { onMount } from 'svelte'
  import { replace, push } from 'svelte-spa-router'
  import * as validator from '../../../../utils/validator'
  import { id } from '../../../states/user'
  import {
    title,
    image,
    answers,
    isPublic,
    license,
    source,
    getBread,
    updateFromBreadDetail,
  } from '../../../states/user-input/bread-edit'
  import {
    bread,
    fetchFromServer,
    fromWhere,
    errMsg as fetchedErrMsg,
  } from '../../../states/bread-detail'
  import {
    update,
    remove,
    removedErrMsg,
    updatedErrMsg,
  } from '../../../states/user-bread'
  import { success } from '../../../states/alert'
  import { reset } from '../../../states/breads-summary'
  import { getList } from '../../../utils/license'
  import * as answersUtil from '../../../utils/answers'
  import * as idb from '../../../utils/idb'
  import { isSame } from '../../../utils/bread'
  import FromWhere from '../../../const/from-where'
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Operation from '../../parts/Bread/Operation'
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
  let isPause = true
  let isPlaying = false

  $: disabledSkipBack = playbackIndex === -1
  $: disabledSkipForward = playbackIndex === $answers.length

  $: titleErrMsg = validator.bread.title.getErrMsg($title)
  $: sourceErrMsg = validator.bread.source.getErrMsg($source)
  $: answersErrMsg = validator.bread.answers.getErrMsg($answers)
  $: apiErrMsg = $updatedErrMsg || $removedErrMsg

  onMount(() => {
    updateFromBreadDetail()
  })

  function onDrop(e) {
    $image = e.detail
  }

  function onSkipBack() {
    isPause = true
    isPlaying = false
    playbackIndex = -1
  }
  function onSkipForward() {
    isPause = true
    isPlaying = false
    playbackIndex = $answers.length
  }

  function onPlay() {
    if ($answers.length === playbackIndex) {
      playbackIndex = 0
    }

    if (playbackIndex === -1) {
      playbackIndex = 0
    }

    isPause = false
    isPlaying = true
  }

  function onPause() {
    isPause = true
    isPlaying = false
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
    isPlaying = false
  }

  async function deleteBread() {
    const isConfirm = window.confirm(
      '[パンの削除]\nこの操作は取り消せません。削除しますか？'
    )

    if (!isConfirm) return

    buttonDisabled = true

    await remove(nanoId)

    buttonDisabled = false

    if (!$removedErrMsg) {
      replace('/')
      $success = 'パン削除完了'
      reset()
    }
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

      idb.updateBread(nanoId, bread)
    }
  }

  function goHome() {
    push('/')
  }

  async function refresh() {
    isRefreshing = true
    await fetchFromServer(nanoId)

    if ($fetchedErrMsg) {
      isRefreshing = false
      alert($fetchedErrMsg)
      return
    }

    if (isSame(getBread(nanoId), $bread)) {
      isRefreshing = false
      alert('変更はありません')
      return
    }

    updateFromBreadDetail()
    idb.updateBread(nanoId, $bread)

    isRefreshing = false
    alert('最新パンを取得しました')
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
    margin-top: -12px;
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

      <Operation
        visibleFavorite={false}
        isFavorite={false}
        disabledFavorite={false}
        disabledRefresh={isRefreshing || $fromWhere === FromWhere.SERVER}
        fromWhere={$fromWhere}
        on:refresh={refresh} />
    </div>

    <div class="justify-center">
      <Controller
        disabledPrev={true}
        {disabledSkipBack}
        {disabledSkipForward}
        disabledPlay={false}
        disabledNext={true}
        {isPlaying}
        on:prev={console.error}
        on:skipBack={onSkipBack}
        on:skipForward={onSkipForward}
        on:play={onPlay}
        on:pause={onPause}
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
          {isPause}
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
    <Selectbox label="ライセンス" options={getList()} bind:value={$license} />
  </div>

  <div class="justify-end">
    <Button
      text="パン削除"
      passive
      disabled={buttonDisabled}
      on:click={deleteBread} />
    <Button
      text="パン更新"
      active
      disabled={buttonDisabled}
      on:click={updateBread} />
  </div>

  {#if apiErrMsg}
    <p class="justify-end error">{apiErrMsg}</p>
  {/if}
</div>
