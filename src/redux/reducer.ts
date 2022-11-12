import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from '../saga/rootSaga';
import messageReducer from './messageSlice';
import userReducer from './userSlice';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { combineReducers, applyMiddleware } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'message',
  storage,
};
const reducers = combineReducers({ messages: messageReducer, user: userReducer });
const persistedReducer = persistReducer(persistConfig, reducers);

export const sagaMiddleware: any = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false /* {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }, */
    }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>



