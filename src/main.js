import 'file-drop-element'
import 'modern-css-reset/dist/reset.min.css'
import App from './components/App'
import './states/auth'
import './utils/idb'

new App({
  target: document.getElementById('app'),
})
