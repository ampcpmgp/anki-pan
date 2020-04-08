<script>
  import { onMount } from 'svelte'
  import { replace } from 'svelte-spa-router'
  import arrayMove from 'array-move'
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
  let answers = []
  let isPublic = false
  let source = ''
  let license = License.OTHER
  let playbackIndex = -1
  $: titleErrMsg = bread.title.getErrMsg(name)
  $: sourceErrMsg = source && bread.source.getErrMsg(source)
  $: answersErrMsg = bread.answer.getErrMsg(answers)

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

  function onPlay() {
    playbackIndex = 0
  }

  function onAnswerUpdate(e) {
    const { answer, index, newIndex } = e.detail

    answers[index] = answer

    arrayMove(answers, index, newIndex)
    answers = answers.filter(answer => answer)
  }
  function onAnswerCreate(e) {
    const { answer, newIndex } = e.detail

    answers[newIndex] = answer

    answers = answers.filter(answer => answer)
  }
  function onAnswerDelete(e) {
    const { index } = e.detail
    answers.splice(index, 1)
  }
  function onAnswerNext() {
    ++playbackIndex
  }
  function onAnswerEnd() {
    playbackIndex = -1
  }

  function createBread() {
    if (!name) {
      window.alert('タイトル名が入力されていません。')
      return
    }

    if (titleErrMsg) {
      window.alert('タイトル名にエラーが出ています。')
      return
    }

    if (!$imgSrc) {
      window.alert('画像が設定されていません。')
      return
    }

    if (answers.length === 0) {
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

    console.log(name, $imgSrc, answers, isPublic, source, license)
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
        on:back={console.info}
        on:play={onPlay}
        on:next={console.info} />
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
          {answers}
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
    <Button text="パン作成" active disabled={false} on:click={createBread} />
  </div>
</div>
