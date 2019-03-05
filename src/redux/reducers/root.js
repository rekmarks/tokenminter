
import { combineReducers } from 'redux'
import { contracts } from 'chain-end'
import {
  reducers as w3sReducers,
  initialState as w3sInitialState,
  addInitialContractType,
} from 'web3-sagas'

// add initial contracts to state
contracts.forEach(c => {
  addInitialContractType(w3sInitialState.contracts, c)
})

export default combineReducers({
  ...w3sReducers,
})

export const initialState = {
  ...w3sInitialState,
}
