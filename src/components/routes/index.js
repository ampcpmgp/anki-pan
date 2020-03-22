import Home from './Home'
import BreadsDetail from './BreadsDetail'
import BreadsEdit from './BreadsEdit'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/breads/detail/:id': BreadsDetail,
  '/breads/edit/:id': BreadsEdit,
  '*': NotFound,
}
