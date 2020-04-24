const { verifyToken } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')
const { bread } = require('../../../utils/validator')
const { getName } = require('../../../utils/license')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const { data: user } = await getDBUser(subjectClaim)

  const { nanoId, title, answers, isPublic, source, license } = req.body

  if (!bread.nanoId.isValid(nanoId)) {
    throw new ApiError('NanoId Error', 400)
  }

  if (!bread.title.isValid(title)) {
    throw new ApiError('Title Error', 400)
  }

  if (!bread.answers.isValid(answers)) {
    throw new ApiError('Answers Error', 400)
  }

  if (typeof isPublic !== 'boolean') {
    throw new ApiError('isPublic Error', 400)
  }

  if (!bread.source.isValid(source)) {
    throw new ApiError('Source Error', 400)
  }

  if (!getName(license)) {
    throw new ApiError('License Error', 400)
  }

  try {
    await client.query(
      q.Update(
        q.Select(
          'ref',
          q.Get(
            q.Intersection(
              q.Match(q.Index('breads_by_nano_id'), nanoId),
              q.Match(q.Index('breads_by_user_nano_id'), user.nanoId)
            )
          )
        ),
        {
          data: {
            nanoId,
            title,
            answers,
            isPublic,
            source,
            license,
          },
        }
      )
    )

    res.json({
      message: 'success',
      nanoId,
    })
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new ApiError('NotFound', 404)
    }

    throw new Error(error)
  }
})
