const { ApiError, handleApiError } = require('../../_utils/api-error')
const { client, q } = require('../../_utils/faunadb')

module.exports = handleApiError(async (req, res) => {
  const {
    query: { nanoId },
  } = req

  try {
    const response = await client.query(
      q.Get(q.Match(q.Index('breads_by_nano_id'), nanoId))
    )

    // TODO: ユーザー不一致ならisPublicの場合返さない。

    res.json(response.data)
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new ApiError('NotFound', 404)
    }

    throw new Error(error)
  }
})
