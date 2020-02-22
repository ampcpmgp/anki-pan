import 'modern-css-reset/dist/reset.min.css'
import App from './components/App'
import { init } from './states/auth'

new App({
  target: document.getElementById('app'),
})

init()
