import Home from './Home'
import Test from './Test'
import NotFound from './NotFound'

export default {
  '/': Home,
  '/test': Test,
  '*': NotFound,
}
