module.exports = (req, res) => {
  const {
    query: { breadId },
  } = req

  const bread = {}

  res.json({
    breadId,
    bread,
  })
}
