import { all } from 'redux-saga/effects';
import { watchSagaGetAll } from "./sagaGetAll";

export function* rootSaga(): Generator {
  yield all([
    watchSagaGetAll()
  ])
}