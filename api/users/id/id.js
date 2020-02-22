module.exports = (req, res) => {
  const {
    query: { id },
  } = req

  res.send(`Hello ${id}!`)
}
