<script>
  import { onMount } from 'svelte'
  import AccountEntry from '../../parts/Modal/AccountEntry'
  import { getUserProfile } from '../../../states/auth'

  onMount(async () => {
    const userProfile = await getUserProfile()
    console.log(userProfile)
  })
</script>

<AccountEntry value={1} connecting={1} on:cancel={2} on:register={3} />
