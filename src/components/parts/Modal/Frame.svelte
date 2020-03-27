<style>
  .frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .background {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    margin: auto;
    max-height: 100vh;
  }
</style>

<div class="frame">
  <div class="background" on:click />
  <div class="content">
    <slot />
  </div>
</div>
