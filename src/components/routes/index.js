import Home from './Home'
import BreadsDetail from './BreadsDetail'
import BreadsEdit from './BreadsEdit'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/breads/detail/:nanoId': BreadsDetail,
  '/breads/edit/:nanoId': BreadsEdit,
  '*': NotFound,
}
