const { handleApiError } = require('../../_utils/api-error')
const { client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const {
    query: { nanoId },
  } = req

  const response = await client.query(
    q.Get(q.Match(q.Index('breads_by_nano_id'), nanoId))
  )

  res.json(response.data)
})
