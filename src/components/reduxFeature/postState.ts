import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { loadingEnd, loadingStart } from './reloadingState'

interface post {
    postStt : {},
    isFetching : boolean,
    error : boolean,
}

const initialState : post = {
    postStt : {},
    isFetching  : false,
    error : false ,
}

export const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        postStart : (state) => {
           state.isFetching = true
  
        },
        postSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.postStt = action.payload;
            state.error = false;
      
        },
        postFail : (state) =>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    postStart,
    postSuccess,
    postFail
} = postSlice.actions

export default postSlice.reducer