import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/reduxFeature/loginState'


export const makeStore = () => {
  return configureStore({
    reducer : {
      loginStatus : loginReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']