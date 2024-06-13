import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface isLikePost {
    listLike : [],
    isLikeFetching : boolean,
    error : boolean,
    finish : boolean
}

const initialState : isLikePost = {
    listLike : [],
    isLikeFetching : false,
    error : false,
    finish : false
}

export const actionLike = createSlice({
    name : 'likeState',
    initialState,
    reducers : {
        likeStart : (state) => {
            state.isLikeFetching = true,
            state.finish = false
        },
        likeFinish : (state,action) => {
            state.isLikeFetching = false,
            state.error = false,
            state.finish = true
            state.listLike = action.payload
        },
        likeEnd : (state) => {
            state.isLikeFetching = false,
            state.error = false,
            state.finish = true
        },
        likeError : (state) =>{
            state.isLikeFetching = false,
            state.error = true,
            state.finish = false

        }
    }
})
export const {
    likeStart,
    likeFinish,
    likeError,
    likeEnd
} = actionLike.actions

export default actionLike.reducer