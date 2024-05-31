import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoading{
    isLoading : boolean
}

const initialState : ILoading = {
    isLoading : false
}

export const loadingSlice = createSlice({
    name : 'loading',
    initialState,
    reducers : {
        loadingStart : (state) =>{
            state.isLoading = true
        },
        loadingEnd : (state) =>{
            state.isLoading = false
        }
    }
})

export const {
    loadingStart, loadingEnd
} = loadingSlice.actions;

export default loadingSlice.reducer