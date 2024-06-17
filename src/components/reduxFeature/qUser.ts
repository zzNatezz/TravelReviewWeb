import { createSlice } from '@reduxjs/toolkit'

interface IQUser {
    listUser : any[],
    isFetching : boolean,
    error : boolean
}

const initialState : IQUser = {
    listUser : [],
    isFetching : false,
    error : false
}

export const QuserSlice = createSlice({
    name : 'Quser',
    initialState,
    reducers : {
        QuserStart : (state) =>{
            state.isFetching = true
        },
        QuserSuccess : (state, action) =>{
            state.isFetching = false
            state.listUser = action.payload
        },
        QuserFail : (state) =>{
            state.isFetching = false,
            state.error = true
        }
    }
})

export const {QuserFail, QuserStart, QuserSuccess} = QuserSlice.actions;

export default QuserSlice.reducer;