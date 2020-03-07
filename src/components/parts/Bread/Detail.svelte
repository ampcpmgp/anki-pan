<script>
  export let title
  export let userId
  export let image
  export let answers
  export let source
  export let license
</script>

<div>{title}</div>
<div>{userId}</div>
<img src={image} alt="" />
<div>{answers}</div>
<div>{source}</div>
<div>{license}</div>
