import { createSlice } from '@reduxjs/toolkit'

interface IModal {
    isOpen : undefined | number,
}

const initialState : IModal = {
    isOpen : undefined,
}

export const modalSlice  = createSlice({
    name : "modal",
    initialState,
    reducers : {
        modalOpen : (state, action) =>{
            state.isOpen = action.payload},
        modalClose  : (state) =>{
            state.isOpen = undefined;
        }
    }
}) 

export const {modalOpen, modalClose} = modalSlice.actions;

export default modalSlice.reducer