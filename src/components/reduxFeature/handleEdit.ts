import { createSlice } from '@reduxjs/toolkit'

interface IEdit {
    index : undefined | number,
}

const initialState : IEdit = {
    index : undefined,
}

export const editSlice  = createSlice({
    name : "edit",
    initialState,
    reducers : {
        editOpen : (state, action) =>{
            state.index = action.payload},
        editClose  : (state) =>{
            state.index = undefined;
        }
    }
}) 

export const {editOpen, editClose} = editSlice.actions;

export default editSlice.reducer