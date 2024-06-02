import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IRemovePost {
    success : boolean,
    isFetching : boolean,
    error : boolean,
}

const initialState : IRemovePost = {
    success : false,
    isFetching  : false,
    error : false ,
}

export const IRemovePostSlice = createSlice({
    name : 'RemovePost',
    initialState,
    reducers : {
        removedPostStart : (state) => {
           state.isFetching = true
        },
        removedPostSuccess : (state) =>{
            state.isFetching = false;
            state.success = true;
            state.error = false;
        },
        removedPostFail : (state) =>{
            state.isFetching = false;
            state.error = true;
            state.success = false
        }
    }
})

export const {
    removedPostStart,
    removedPostSuccess,
    removedPostFail
} = IRemovePostSlice.actions

export default IRemovePostSlice.reducer