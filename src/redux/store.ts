import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from '@/components/reduxFeature/authState';
import registerReducer from '@/components/reduxFeature/registerRedux'
import userListReducer from "@/components/reduxFeature/getAlluser"
import modalReducer from "@/components/reduxFeature/modal"
import getPostReducer from '@/components/reduxFeature/getPostId'
import loadingReducer from '@/components/reduxFeature/reloadingState'
import postReducer from '@/components/reduxFeature/postState'
import removePostReducer from '@/components/reduxFeature/removePost'
import indexReducer from '@/components/reduxFeature/handleEdit'
import modifyContentReducer from '@/components/reduxFeature/modifyContent'
import commentPostReducer from "@/components/reduxFeature/postCommentState"
import removeCmtReducer from '@/components/reduxFeature/removeCmtState'
import modifyCmtReducer from '@/components/reduxFeature/modifyCmt'




export const makeStore = () => {
  return configureStore({
    reducer : {
      authState : authReducer,
      register  : registerReducer,
      userList : userListReducer,
      modalState : modalReducer,
      getPost : getPostReducer,
      isLoading : loadingReducer,
      postStt : postReducer,
      removePost : removePostReducer,
      isIndex : indexReducer,
      modifyString : modifyContentReducer,
      commentPost : commentPostReducer,
      removeCmt : removeCmtReducer,
      modifyCmt : modifyCmtReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
  // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']