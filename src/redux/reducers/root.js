
import { combineReducers } from 'redux'
import { reducers as w3sReducers, initialState as w3sInitialState } from 'web3-sagas'

export default combineReducers({
  ...w3sReducers,
})

export const initialState = {
  ...w3sInitialState,
}
