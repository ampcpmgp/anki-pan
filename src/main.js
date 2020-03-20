import 'file-drop-element'
import 'modern-css-reset/dist/reset.min.css'
import App from './components/App'
import * as auth from './states/auth'

auth.init()

new App({
  target: document.getElementById('app'),
})
