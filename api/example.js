// https://zeit.co/docs/runtimes#official-runtimes/node-js
module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
  })
}
