import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICommentPost {
    comment : {},
    isFetching : boolean,
    error : boolean,
}

const initialState : ICommentPost = {
    comment : {},
    isFetching  : false,
    error : false ,
}

export const CommentPostSlice = createSlice({
    name : 'CommentPost',
    initialState,
    reducers : {
        CommentPostStart : (state) => {
           state.isFetching = true
        },
        CommentPostSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.comment = action.payload;
            state.error = false;
        },
        CommentPostFail : (state) =>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    CommentPostStart,
    CommentPostSuccess,
    CommentPostFail
} = CommentPostSlice.actions

export default CommentPostSlice.reducer