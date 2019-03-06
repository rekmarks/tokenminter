
import { combineReducers } from 'redux'
import {
  reducers as w3sReducers,
  initialState as w3sInitialState,
} from 'web3-sagas'

import graphsReducer, { initialState as graphsInitialState } from './graphs'

export const reducer = combineReducers({
  ...w3sReducers,
  graphs: graphsReducer,
})

export const initialState = {
  ...w3sInitialState,
  graphs: graphsInitialState,
}
