import { errorGetTodos, IMessage } from '../redux/messageSlice';
import { getMessageSuccess } from '../redux/messageSlice';
import { takeEvery, put, call } from 'redux-saga/effects';
import { getServerMessages } from '../api';


export function* workerSaga(action: any): Generator {

  try {
    const data = yield call(getServerMessages, action.payload)
    yield put(getMessageSuccess(data as IMessage))

  }
  catch (error) {
    yield put(errorGetTodos(error));
  }
}

export function* watchSagaGetAll(): Generator {

  yield takeEvery('message/getMessageRequest', workerSaga)

}