import 'modern-css-reset/dist/reset.min.css'
import App from './components/App'
import { init } from './states/auth'

init()

new App({
  target: document.getElementById('app'),
})
