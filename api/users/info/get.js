module.exports = (req, res) => {
  const {
    query: { userName },
  } = req

  const breads = []

  res.json({
    userName,
    breads,
  })
}
