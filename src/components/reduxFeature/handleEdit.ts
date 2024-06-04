import { createSlice } from '@reduxjs/toolkit'

interface Iindex {
    index : undefined | number,
}

const initialState : Iindex = {
    index : undefined,
}

export const indexSlice  = createSlice({
    name : "index",
    initialState,
    reducers : {
        setIndex : (state, action) =>{
            state.index = action.payload},
        unSetIndex  : (state) =>{
            state.index = undefined;
        }
    }
}) 

export const {setIndex, unSetIndex} = indexSlice.actions;

export default indexSlice.reducer