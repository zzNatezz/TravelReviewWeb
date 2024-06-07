import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IRemoveComment{
    success : boolean,
    isFetching : boolean,
    error : boolean,
}

const initialState : IRemoveComment= {
    success : false,
    isFetching  : false,
    error : false ,
}

export const RemoveCommentSlice = createSlice({
    name : 'RemoveComment',
    initialState,
    reducers : {
        removedCommentStart : (state) => {
           state.isFetching = true
        },
        removedCommentSuccess : (state) =>{
            state.isFetching = false;
            state.success = true;
            state.error = false;
        },
        removedCommentEnd : (state) =>{
            state.isFetching = false;
        }
    }
})

export const {
    removedCommentStart,
    removedCommentSuccess,
    removedCommentEnd
} = RemoveCommentSlice.actions

export default RemoveCommentSlice.reducer