import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IOpenSearch{
    isOpen : boolean
}

const initialState : IOpenSearch = {
    isOpen : false
}

export const SearchSlice = createSlice({
    name : 'Search',
    initialState,
    reducers : {
        searchStart : (state) =>{
            state.isOpen = true
        },
        searchEnd : (state) =>{
            state.isOpen = false
        }
    }
})

export const {
    searchStart, searchEnd
} = SearchSlice.actions;

export default SearchSlice.reducer