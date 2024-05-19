import { createSlice } from '@reduxjs/toolkit'

interface userList {
    listUser : [],
    isFetching : boolean,
    error : boolean
}

const initialState : userList = {
    listUser : [],
    isFetching : false,
    error : false
}

export const userListSlice = createSlice({
    name : 'userList',
    initialState,
    reducers : {
        getUserListStart : (state) =>{
            state.isFetching = true
        },
        getUserListSuccess : (state, action) =>{
            state.isFetching = false
            state.listUser = action.payload
        },
        getUserListFail : (state) =>{
            state.isFetching = false,
            state.error = true
        }
    }
})

export const {getUserListFail, getUserListStart, getUserListSuccess} = userListSlice.actions;

export default userListSlice.reducer;