<script>
  export let message = ''
  export let success = false
</script>

<style>
  p {
    padding: 4px 12px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
  }

  /* 参考URL: https://getbootstrap.com/docs/4.0/components/alerts/#examples */
  .success {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
  }
</style>

<p class:success>{message}</p>
