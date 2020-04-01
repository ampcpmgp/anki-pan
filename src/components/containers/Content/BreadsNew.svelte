<script>
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Checkbox from '../../parts/Form/Checkbox'
  import Text from '../../parts/Form/Text'
  import Selectbox from '../../parts/Form/Selectbox'
  import Button from '../../parts/Form/Button'
</script>

<style>
  .breads-new {
    display: grid;
  }
</style>

<div class="breads-new">
  <Title name="" userId="" readOnly={true} errMsg={''} />
  <Controller back={console.info} play={console.info} next={console.info} />
  <Image imgSrc="" editable={false} answers={[]} playbackIndex={-1} />
  <Checkbox label="" checked={false} />
  <Text label="" value="" placeholder="" errMsg="" />
  <Selectbox options={[]} value="" />
  <Button text="" type="" disabled={false} on:click={console.info} />
</div>
