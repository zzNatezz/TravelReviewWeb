import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface post {
    currentPost : {},
    isFetching : boolean,
    error : boolean
}

const initialState : post = {
    currentPost : {},
    isFetching  : false,
    error : false  
}

export const getPostSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        getPostStart : (state) => {
           state.isFetching = true
        },
        getPostSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.currentPost = action.payload;
            state.error = false;
        },
        getPostFail : (state) =>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    getPostStart,
    getPostSuccess,
    getPostFail
} = getPostSlice.actions

export default getPostSlice.reducer