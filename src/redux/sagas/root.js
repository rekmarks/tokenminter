
import { all } from 'redux-saga/effects'
import { sagas as web3Sagas } from 'web3-sagas'

export default function * rootSaga () {
  yield all([
    ...web3Sagas,
  ])
}
