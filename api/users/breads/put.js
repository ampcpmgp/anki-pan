module.exports = (req, res) => {
  const {
    body: { bread, breadId },
  } = req

  res.json({
    breadId,
    bread,
  })
}
