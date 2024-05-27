import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/components/reduxFeature/authState';
import registerReducer from '@/components/reduxFeature/registerRedux'
import userListReducer from "@/components/reduxFeature/getAlluser"
import modalReducer from "@/components/reduxFeature/modal"
import getPostReducer from '@/components/reduxFeature/getPostId'


export const makeStore = () => {
  return configureStore({
    reducer : {
      authState : authReducer,
      register  : registerReducer,
      userList : userListReducer,
      modalState : modalReducer,
      getPost : getPostReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']