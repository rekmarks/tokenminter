
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

import App from './components/App'
import Web3Gatekeeper from './components/Web3Gatekeeper'
import * as serviceWorker from './serviceWorker'
import configureStore from './redux/configureStore'

const store = configureStore()

store.runSaga()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Web3Gatekeeper>
        <App />
      </Web3Gatekeeper>
    </Router>
  </Provider>,
document.getElementById('root'))

serviceWorker.unregister()
