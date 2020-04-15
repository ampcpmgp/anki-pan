<script>
  import { onMount } from 'svelte'
  import AccountEntry from '../../parts/Modal/AccountEntry'
  import {
    fetchAccount,
    hasNoId,
    register,
    registrationErrMsg,
  } from '../../../states/user.js'
  import { logout } from '../../../states/auth'

  let connecting = false
  let value = ''

  onMount(async () => {
    try {
      await fetchAccount()
    } catch (error) {
      // ユーザー取得エラー時は何もせず、この画面を表示しない。
      return
    }
  })

  async function onRegister() {
    connecting = true
    await register(value)
    connecting = false
  }
</script>

{#if $hasNoId}
  <AccountEntry
    bind:value
    {connecting}
    errMsg={$registrationErrMsg}
    on:cancel={logout}
    on:register={onRegister} />
{/if}
