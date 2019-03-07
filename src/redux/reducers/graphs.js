
import { ContractGraph } from 'solidity-abi-graphs'

const ACTIONS = {
  SET_CONTRACT_GRAPH: 'GRAPHS:SET_CONTRACT_GRAPH',
  LOG_ERROR: 'GRAPHS:LOG_ERROR',
  CLEAR_ERRORS: 'GRAPHS:CLEAR_ERRORS',
}

const initialState = {

  contracts: {
    // id: ContractGraph, // same id as the contract artifact
  },

  errors: [],
}

export {
  ACTIONS,
  initialState,
  addInitialContractGraph,
}

/**
 * Initialization Helpers
 */

/**
 * Add graph of contract type to state.
 * WARNING: Only use this when initializing app state, e.g. in configureStore.
 * @param {object} state graphs initial state
 * @param {string} id contract type id from contracts state
 * @param {object} artifact contract artifact from contracts state
 */
function addInitialContractGraph (state, id, artifact) {
  state.contracts[id] = new ContractGraph(
    artifact, { id, constructorOnly: true }
  )
}

/**
 * Reducer
 */

export default function reducer (state = initialState, action) {

  switch (action.type) {

    case ACTIONS.SET_CONTRACT_GRAPH:
      return {
        ...state,
        contracts: {

          ...state.contracts,
          [action.id]: action.graph,
        },
      }

    case ACTIONS.LOG_ERROR:
      return {
        ...state,
        errors: state.errors.concat(action.error),
      }

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      }

    default:
      return state
  }
}

/**
 * Action creators
 */

/**
 * @param {string} id contract type id from contracts reducer
 * @param {object} artifact contract artifact from contracts reducer
 */
function getSetContractGraphAction (id, artifact) { // eslint-disable-line
  return {
    type: ACTIONS.SET_CONTRACT_GRAPH,
    id,
    graph: new ContractGraph(artifact, { id, constructorOnly: true }),
  }
}
