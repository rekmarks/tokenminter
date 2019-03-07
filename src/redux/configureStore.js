
import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleWare from 'redux-saga'
import { contracts } from 'chain-end'
import { sagas as web3Sagas, addInitialContractType } from 'web3-sagas'
import { all } from 'redux-saga/effects'

import { reducer, initialState } from './reducers/root'
import { addInitialContractGraph } from './reducers/graphs'
import { sagas as formsSagas } from './sagas/forms'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleWare()

// set up enhancer
const enhancer = compose(
  applyMiddleware(
    sagaMiddleware,
    loggerMiddleware
  ),
)

// add initial contracts to state
Object.values(contracts).forEach(c => {
  addInitialContractType(initialState.contracts, c)
})

// add initial contract graphs to state
Object.values(initialState.contracts.types).forEach(t => {
  addInitialContractGraph(initialState.graphs, t.id, t.artifact)
})

// define root saga
function * rootSaga () {
  yield all([
    ...web3Sagas,
    ...formsSagas,
  ])
}

export default function configureStore () {
  return {
    ...createStore(reducer, initialState, enhancer),
    runSaga: () => sagaMiddleware.run(rootSaga),
  }
}
