<script>
  import { onMount } from 'svelte'
  import AccountEntry from '../../parts/Modal/AccountEntry'
  import { fetchAccount } from '../../../states/user'

  onMount(async () => {
    const account = await fetchAccount()
    console.log(account)
  })
</script>

<AccountEntry value={1} connecting={1} on:cancel={2} on:register={3} />
