<script>
  export let text = ''
  export let color = 'black'
  export let disabled = false
</script>

<style>
  p {
    display: inline-grid;
    text-decoration: underline;
    cursor: pointer;
  }

  p.disabled {
    pointer-events: none;
    opacity: 0.3;
  }
</style>

<p class:disabled style="color: {color};" on:click>{text}</p>
