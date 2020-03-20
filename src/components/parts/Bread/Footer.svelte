<script>
  import feather from 'feather-icons'
  export let source
  export let license

  const svg = {
    externalLink: feather.icons['external-link'].toSvg({
      width: '20px',
      height: 'auto',
    }),
  }
</script>

<style>
  footer {
    padding: 0 4px;
    height: 26px;
    background-color: cornsilk;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    grid-column-gap: 16px;
  }

  a {
    text-decoration: none;
    color: dodgerblue;
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 6px;
  }

  p {
    font-size: 0.9em;
    color: #555;
  }
</style>

<footer>
  {#if source}
    <a href={source} target="_blank">
      出典元リンク
      {@html svg.externalLink}
    </a>
  {/if}
  <p>ライセンス: {license}</p>
</footer>
