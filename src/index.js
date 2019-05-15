
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

const addWeb3Listeners = () => store.addListeners(store.dispatch)

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Web3Gatekeeper>
        <App addWeb3Listeners={addWeb3Listeners} />
      </Web3Gatekeeper>
    </Router>
  </Provider>,
document.getElementById('root'))

serviceWorker.unregister()
