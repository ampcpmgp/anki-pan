module.exports = (req, res) => {
  const {
    body: { bread },
  } = req

  const breadId = ''

  res.json({
    breadId,
    bread,
  })
}
