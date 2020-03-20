<script>
  export let text = ''
  export let color = 'black'
</script>

<style>
  p {
    display: inline-grid;
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<p style="color: {color};" on:click>{text}</p>
