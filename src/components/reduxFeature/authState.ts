import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface auth {
    currentUser : string,
    isFetching : boolean,
    error : boolean,
}

const initialState : auth = {
    currentUser : "",
    isFetching  : false,
    error : false ,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        loginStart : (state) => {
           state.isFetching = true
        },
        loginSuccess : (state,action : PayloadAction<string>) =>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFail : (state) =>{
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFail
} = authSlice.actions

export default authSlice.reducer