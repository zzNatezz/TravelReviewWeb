import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
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
import createWebStorage from 'redux-persist/es/storage/createWebStorage'; 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import likePostProducer from '@/components/reduxFeature/isLike'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("authLocal")
    : createNoopStorage();

const authPersistConfig = {
  key: "authState",
  storage: storage,
  whitelist: ["authState"],
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  authState: persistedReducer,
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
  modifyCmt : modifyCmtReducer,
  listLike : likePostProducer,
});


export const makeStore =  configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  })

export type RootState  = ReturnType<typeof makeStore.getState>
export type AppDispatch = typeof makeStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  