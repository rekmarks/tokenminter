
import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleWare from 'redux-saga'

import rootReducer, { initialState } from './reducers/root'
import rootSaga from './sagas/root'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleWare()

const enhancer = compose(
  applyMiddleware(
    sagaMiddleware,
    loggerMiddleware
  ),
)

export default function configureStore () {
  return {
    ...createStore(rootReducer, initialState, enhancer),
    runSaga: () => sagaMiddleware.run(rootSaga),
  }
}
