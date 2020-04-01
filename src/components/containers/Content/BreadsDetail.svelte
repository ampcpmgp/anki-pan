<script>
  import Title from '../../parts/Bread/Title'
  import Controller from '../../parts/Bread/Controller'
  import Image from '../../parts/Bread/Image'
  import Footer from '../../parts/Bread/Footer'
</script>

<style>
  .breads-detail {
    display: grid;
  }
</style>

<div class="breads-detail">
  <Title name="" userId="" readOnly={true} errMsg={''} />
  <Controller back={console.info} play={console.info} next={console.info} />
  <Image imgSrc="" editable={false} answers={[]} playbackIndex={-1} />
  <Footer source="" license="" />
</div>
