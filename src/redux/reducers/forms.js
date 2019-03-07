
const ACTIONS = {
  STORE_DEPLOYMENT_RESULT: 'FORMS:STORE_DEPLOYMENT_RESULT',
  CLEAR_DEPLOYMENT_RESULT: 'FORMS:CLEAR_DEPLOYMENT_RESULT',
  LOG_ERROR: 'FORMS:LOG_ERROR',
  CLEAR_ERRORS: 'FORMS:CLEAR_ERRORS',
}

const initialState = {

  deploymentResult: null,

  errors: [],
}

export {
  ACTIONS,
  initialState,
  getStoreDeploymentResultAction as storeDeploymentResult,
  getClearDeploymentResultAction as clearDeploymentResult,
}

/**
 * Reducer
 */

export default function reducer (state = initialState, action) {

  switch (action.type) {

    case ACTIONS.STORE_DEPLOYMENT_RESULT:
      return {
        ...state,
        deploymentResult: action.result,
      }

    case ACTIONS.CLEAR_DEPLOYMENT_RESULT:
      return {
        ...state,
        deploymentResult: null,
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
 * Stores the deployment result.
 * @param {object} result the deployment result
 */
function getStoreDeploymentResultAction (result) {
  return {
    type: ACTIONS.STORE_DEPLOYMENT_RESULT,
    result,
  }
}

/**
 * Clears the deployment result.
 */
function getClearDeploymentResultAction () {
  return { type: ACTIONS.CLEAR_DEPLOYMENT_RESULT }
}
