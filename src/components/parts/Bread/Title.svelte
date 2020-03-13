<script>
  export let name
  export let userId
  export let readonly
  export let errMsg
</script>

<style>
  .wrapper {
    display: grid;
    grid-template-areas:
      'a a'
      'b c';
    justify-content: space-between;
  }

  input {
    grid-area: a;
    border: none;
    border-bottom: solid 1px forestgreen;
    color: forestgreen;
    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-id {
    font-size: 12px;
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: dimgrey;
  }

  .error {
    color: orangered;
  }
</style>

<div class="wrapper">
  <input
    type="text"
    placeholder="タイトル名"
    on:input
    value={name}
    {readonly} />
  <div class="user-id">@{userId}</div>

  {#if errMsg}
    <div class="error">{errMsg}</div>
  {/if}
</div>
