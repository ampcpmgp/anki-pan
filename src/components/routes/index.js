import Home from './Home'
import BreadsNew from './BreadsNew'
import BreadsDetail from './BreadsDetail'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/breads/new': BreadsNew,
  '/breads/detail/:nanoId': BreadsDetail,
  '*': NotFound,
}
