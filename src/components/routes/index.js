import Home from './Home'
import BreadsNew from './BreadsNew'
import BreadsDetail from './BreadsDetail'
import BreadsEdit from './BreadsEdit'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/breads/new': BreadsNew,
  '/breads/detail/:nanoId': BreadsDetail,
  '/breads/edit/:nanoId': BreadsEdit,
  '*': NotFound,
}
