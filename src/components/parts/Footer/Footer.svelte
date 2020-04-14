<script>
  import { default as Octocat } from '../../../images/Octocat.jpg'
  import { default as Twitter } from '../../../images/Twitter_Logo_Blue.svg'
</script>

<style>
  footer {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    border-top: 1px solid black;
    padding: 8px;
  }

  img {
    width: auto;
    height: 60px;
  }
</style>

<footer>
  <a href="https://github.com/ampcpmgp/anki-pan/" target="_blank">
    <img src={Octocat} alt="" />
  </a>
  <a href="https://twitter.com/anki_pan_dev" target="_blank">
    <img src={Twitter} alt="" />
  </a>
</footer>
