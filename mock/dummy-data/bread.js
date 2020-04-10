import * as images from '../../src/images/stories'
import { default as License } from '../../const/license'

export default {
  nanoId: 'has-bread-nanoid',
  userNanoId: 'dummy-user-nanoid',
  userId: 'example-user',
  title: '細胞の秘密',
  image: images.prefecturesExistsAnswer,
  answers: [
    {
      top: 0.2,
      left: 0.2,
      width: 0.1,
      height: 0.1,
      name: '北海道',
      reading: '',
    },
  ],
  isPublic: true,
  source: 'http://example.com',
  license: License.CC_BY,
}
