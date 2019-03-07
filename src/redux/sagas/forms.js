
import { put, takeLeading } from 'redux-saga/effects'
import { actionNames as w3sActions } from 'web3-sagas'

import { storeDeploymentResult } from '../reducers/forms'

export const sagas = [
  takeLeading(
    [
      w3sActions.contracts.DEPLOYMENT_SUCCESS,
      w3sActions.contracts.DEPLOYMENT_FAILURE,
    ],
    deploymentResultSaga
  ),
]

// for testing
export function * watchDeploymentResultSaga () {
  yield takeLeading(
    [
      w3sActions.contracts.DEPLOYMENT_SUCCESS,
      w3sActions.contracts.DEPLOYMENT_FAILURE,
    ],
    deploymentResultSaga
  )
}

function * deploymentResultSaga (action) {
  yield put(storeDeploymentResult(
    action.error
    ? action.error
    : { id: action.id, data: action.data }
  ))
}
