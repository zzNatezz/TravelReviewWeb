import { createSlice } from "@reduxjs/toolkit";

interface register {
    isFetching : boolean,
    error : boolean,
    success : boolean
}

const initialState : register = {
    isFetching : false,
    error : false,
    success : false
}

export const registerSlice = createSlice({
    name : 'register',
    initialState,
    reducers :{
        registerStart : (state) =>{
            state.isFetching = true
        },
        registerSuccess : (state) =>{
            state.isFetching = false,
            state.error = false,
            state.success = true
        },
        registerFail : ( state) => {
            state.isFetching = false,
            state.error = true,
            state.success = false
        }
        
    }
})

export const {registerStart, registerFail, registerSuccess} = registerSlice.actions
export default registerSlice.reducer