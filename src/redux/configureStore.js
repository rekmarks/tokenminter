
import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleWare from 'redux-saga'
import { contracts } from 'chain-end'
import { addInitialContractType } from 'web3-sagas'

import { reducer, initialState } from './reducers/root'
import rootSaga from './sagas/root'
import { addInitialContractGraph } from './reducers/graphs'

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

export default function configureStore () {
  return {
    ...createStore(reducer, initialState, enhancer),
    runSaga: () => sagaMiddleware.run(rootSaga),
  }
}
