// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { rootReducer } from './reducers'; // root reducer

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export { store };

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers'; // root reducer
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
export const store = configureStore(
   
   {
    reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend().concat(logger)
   })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

