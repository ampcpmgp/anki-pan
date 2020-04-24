const nanoId = require('nanoid')
const { verifyToken } = require('../../_utils/auth0')
const { ApiError, handleApiError } = require('../../_utils/api-error')
const { getDBUser, client, q } = require('../../_utils/faunadb')
const { bread } = require('../../../utils/validator')
const { getName } = require('../../../utils/license')

module.exports = handleApiError(async (req, res) => {
  const { sub: subjectClaim } = await verifyToken(req)
  const user = await getDBUser(subjectClaim)

  const { title, image, answers, isPublic, source, license } = req.body

  if (!bread.title.isValid(title)) {
    throw new ApiError('Title Error', 400)
  }

  if (!bread.image.isValid(image)) {
    throw new ApiError('Image Error', 400)
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
    const breadNanoId = nanoId()
    await client.query(
      q.Create(q.Collection('Breads'), {
        data: {
          nanoId: breadNanoId,
          userNanoId: user.nanoId,
          userId: user.id,
          title,
          image,
          answers,
          isPublic,
          source,
          license,
        },
      })
    )

    res.json({
      message: 'success',
      nanoId: breadNanoId,
    })
  } catch (error) {
    throw new Error(error)
  }
})
