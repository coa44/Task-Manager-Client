import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage implementation
import createSagaMiddleware from "redux-saga";

import { APPLICATION_SLICE } from "../constants";
import { ApplicationState, applicationSlice } from "../slices/applicationSlice";
import {
  AuthenticationState,
  authenticationSlice,
} from "../slices/authenticationSlice";

import appSagas from "../sagas";
import { TaskState, taskSlice } from "../slices/taskSlice";

export interface Store {
  [APPLICATION_SLICE.APPLICATION]: ApplicationState;
  [APPLICATION_SLICE.AUTH]: AuthenticationState;
  [APPLICATION_SLICE.TASK]: TaskState;
}

export type State = Store;

const persistConfig = {
  key: applicationSlice.name,
  storage,
};

const sagaMiddleware = createSagaMiddleware();

/**
 * Main store setup
 * Persist authentication state in order to save user auth related data inside the local storage for later usage
 */
const store = configureStore({
  reducer: combineReducers({
    [taskSlice.name]: taskSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
    [authenticationSlice.name]: persistReducer(
      persistConfig,
      authenticationSlice.reducer
    ),
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(appSagas);

// Create the Redux store
const persistor = persistStore(store);

export { store, persistor };
