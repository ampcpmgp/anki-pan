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
      lang: 'ja-JP',
    },
    {
      top: 0.84,
      left: 0.84,
      width: 0.1,
      height: 0.1,
      name: '沖縄',
      reading: 'おきなわけん',
      lang: 'ja-JP',
    },
    {
      top: 0.67,
      left: 0.35,
      width: 0.05,
      height: 0.05,
      name: '香川',
      reading: '',
      lang: 'ja-JP',
    },
  ],
  isPublic: true,
  source: 'http://example.com',
  license: License.CC_BY,
}
